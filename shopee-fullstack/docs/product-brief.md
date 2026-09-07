# Product Brief — shopee-fullstack

> Status: **Sprint 0 · Deliverable #1**
> Terakhir diperbarui: 2026-09-07
> Pemilik dokumen: Product Owner

---

## 1. Problem statement

Penjual kecil butuh tempat untuk memajang barang dan menerima pesanan, pembeli butuh tempat untuk menemukan barang dan membelinya dengan aman. Project ini membangun marketplace sederhana yang menutup satu lingkaran transaksi secara **utuh** — dari produk ditemukan sampai pesanan dinyatakan dikirim.

Fokusnya bukan kelengkapan fitur, melainkan **satu perjalanan yang benar-benar jalan ujung ke ujung**, dengan kualitas rekayasa setara produk sungguhan (test, kontrak API, CI/CD, dokumentasi keputusan).

## 2. Perjalanan kritis (critical journey)

> **Buyer bisa menemukan produk → memasukkannya ke keranjang → checkout → membayar → melihat status pesanannya, sampai seller menandai pesanan itu dikirim.**

Kalimat ini adalah alat pemutus scope. Aturannya mekanis:

- Fitur yang **berdiri di jalur ini** → kandidat Must.
- Fitur yang **tidak berdiri di jalur ini** → bukan Must, tanpa perdebatan.

Perjalanan ini juga merangkap sebagai **skenario demo** dan sebagai **happy path E2E test**.

## 3. Scope — MoSCoW

### 3.1 Must have (v1)

Sepuluh epic, **semuanya versi tipis**. Yang dipotong bukan hanya epic, tapi story di dalamnya.

| Kode | Epic | Masuk v1 | Tidak masuk v1 |
|---|---|---|---|
| A | Auth & Account | register, login, logout, refresh token | verifikasi email, lupa password, edit profil |
| B | Store | toko sebagai entitas, halaman toko publik | flow buka toko, kelola profil toko → **seeder** |
| C | Product Catalog | list produk, detail produk, varian, stok | seller CRUD produk penuh, multi-gambar → **seeder** |
| D | Search & Browse | list + pagination + filter kategori | search full-text, filter harga/lokasi/rating, sorting |
| E | Cart | tambah / ubah qty / hapus, keranjang multi-toko | simpan untuk nanti, checkout sebagian item |
| F | Address | satu alamat kirim sederhana | multi-alamat, alamat utama, integrasi data wilayah |
| G | Checkout & Order | buat order, snapshot harga, riwayat, status | pembatalan, retur, refund |
| H | Payment | Midtrans Snap (sandbox) + webhook idempoten | split payment, cicilan, e-wallet khusus |
| I | Shipping | ongkir flat, nomor resi dummy, status manual | **integrasi API kurir asli, tracking sungguhan** |
| J | Seller Order Management | daftar order masuk, ubah status pesanan | statistik penjualan, grafik, laporan |

### 3.2 Should have (v1.1 — dikerjakan hanya jika Must selesai lebih awal)

Search full-text · filter harga & rating · sorting · seller CRUD produk penuh · edit profil user · multi-alamat.

### 3.3 Won't have (v1) — komitmen, bukan penundaan

| Kode | Epic | Alasan |
|---|---|---|
| 10 | Review & Rating | tidak berdiri di perjalanan kritis |
| 11 | Promo (voucher, flash sale, gratis ongkir) | menambah kompleksitas perhitungan harga secara drastis |
| 12 | Wishlist | nilai demo rendah dibanding biayanya |
| 13 | Chat buyer ↔ seller | butuh realtime, praktis menjadi project tersendiri |
| 14 | Notification (email / in-app) | tidak ada lagi yang butuh kirim email setelah epic A dipotong |
| 16 | Admin | kategori master cukup disediakan lewat **seeder** |

> **Won't berarti tidak dibangun di v1 dan tidak dinegosiasikan ulang selama v1 berjalan.**
> Ide baru yang muncul saat coding tidak masuk ke editor — masuk ke backlog.

### 3.4 Konsekuensi yang disadari dan diterima

- Data toko, kategori, dan sebagian produk **disediakan lewat seeder**, bukan lewat UI. Sisi *baca* wajib jalan; sisi *tulis* sebagian ditunda.
- Ongkir bernilai tetap dan nomor resi bersifat dummy. Status pengiriman dimajukan manual oleh seller lewat epic J.
- Tanpa epic 14, tidak ada pengiriman email sama sekali di v1.

## 4. Kesepakatan teknis lintas fitur

Ditetapkan di depan karena mahal untuk diubah belakangan.

1. **Harga disimpan sebagai integer rupiah**, tidak pernah float.
2. **OrderItem menyimpan snapshot** nama & harga produk saat transaksi. Riwayat pesanan tidak boleh ikut berubah ketika harga produk berubah.
3. **Stok berada di level varian**, bukan di level produk.
4. Response envelope konsisten:

```jsonc
// sukses
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 137 } }

// gagal
{ "error": { "code": "STOCK_INSUFFICIENT", "message": "Stok tidak cukup", "details": [] } }
```

5. Frontend memetakan **error code**, bukan mem-parsing kalimat pesan.

### Katalog error code (awal, ditambah seiring jalan)

| Code | HTTP | Kapan dipakai |
|---|---|---|
| `VALIDATION_ERROR` | 400 | body/query gagal validasi skema |
| `UNAUTHENTICATED` | 401 | token tidak ada / tidak valid / kedaluwarsa |
| `FORBIDDEN` | 403 | terautentikasi tapi tidak berhak atas resource |
| `NOT_FOUND` | 404 | resource tidak ditemukan |
| `EMAIL_ALREADY_REGISTERED` | 409 | email sudah dipakai saat register |
| `STOCK_INSUFFICIENT` | 409 | stok varian kurang dari qty yang diminta |
| `CART_EMPTY` | 409 | checkout dijalankan atas keranjang kosong |
| `ORDER_INVALID_TRANSITION` | 409 | perubahan status pesanan tidak sah |
| `INTERNAL_ERROR` | 500 | kegagalan tak terduga (stack trace tidak pernah dibocorkan) |

---

## 5. User story & Acceptance Criteria

Format story: **Sebagai `<peran>`, saya ingin `<aksi>`, supaya `<manfaat>`.**
Format AC: **Given / When / Then.** Satu AC = satu perilaku yang bisa diuji.

Penomoran: `US-<kode epic><nomor>` — contoh `US-A01` adalah story pertama epic Auth.

> Empat story di bawah adalah **contoh acuan**, sengaja dipilih berbeda bentuk: alur normal, aturan bisnis, transaksi, dan proses non-UI.

---

### US-A01 — Register sebagai buyer

**Sebagai** calon pembeli, **saya ingin** mendaftar dengan email dan password, **supaya** saya bisa berbelanja dan memiliki riwayat pesanan.

| ID | Given | When | Then |
|---|---|---|---|
| AC-1 | email belum terdaftar dan password memenuhi aturan | user submit form register | akun dibuat, response `201`, password tersimpan sebagai hash, hash tidak pernah ikut di response |
| AC-2 | email sudah terdaftar | user submit form register | response `409` kode `EMAIL_ALREADY_REGISTERED`, tidak ada akun baru dibuat |
| AC-3 | password kurang dari 8 karakter | user submit form register | response `400` kode `VALIDATION_ERROR`, `details` menunjuk field `password` |

**Out of scope:** verifikasi email, login sosial, captcha.

---

### US-E01 — Menambahkan produk ke keranjang

**Sebagai** buyer, **saya ingin** menambahkan varian produk ke keranjang, **supaya** saya bisa membelinya bersama produk lain sekaligus.

| ID | Given | When | Then |
|---|---|---|---|
| AC-1 | varian tersedia dan stok ≥ qty | buyer menambahkan varian ke keranjang | item masuk keranjang, response `201` berisi isi keranjang terbaru |
| AC-2 | varian yang sama sudah ada di keranjang | buyer menambahkan varian itu lagi | qty **ditambahkan** pada baris yang sudah ada, tidak membuat baris duplikat |
| AC-3 | qty yang diminta melebihi stok varian | buyer menambahkan ke keranjang | response `409` kode `STOCK_INSUFFICIENT`, keranjang tidak berubah |
| AC-4 | keranjang berisi produk dari dua toko berbeda | buyer membuka keranjang | item ditampilkan terkelompok per toko |

**Catatan:** menambahkan ke keranjang **tidak** mengurangi stok. Stok baru berkurang saat checkout.

---

### US-G01 — Checkout keranjang

**Sebagai** buyer, **saya ingin** checkout isi keranjang, **supaya** saya bisa menyelesaikan pembelian.

| ID | Given | When | Then |
|---|---|---|---|
| AC-1 | keranjang punya ≥ 1 item, stok cukup, alamat sudah dipilih | buyer submit checkout | order dibuat berstatus `PENDING_PAYMENT`, stok tiap varian berkurang sesuai qty, keranjang dikosongkan |
| AC-2 | order berhasil dibuat | — | tiap `OrderItem` menyimpan **snapshot** nama & harga produk saat itu; perubahan harga produk setelahnya tidak mengubah order |
| AC-3 | stok salah satu item kurang dari qty | buyer submit checkout | response `409` kode `STOCK_INSUFFICIENT`, **tidak ada** order dibuat dan **tidak ada** stok berkurang — seluruhnya batal |
| AC-4 | keranjang kosong | buyer submit checkout | response `409` kode `CART_EMPTY` |
| AC-5 | keranjang berisi item dari 2 toko | buyer submit checkout | dibuat 1 order per toko |

**Catatan teknis:** AC-3 menuntut seluruh proses berjalan dalam **satu transaksi database**.

**Out of scope:** voucher, gratis ongkir, memilih sebagian item untuk di-checkout.

---

### US-H02 — Menerima notifikasi pembayaran dari Midtrans

**Sebagai** sistem, **saya ingin** memperbarui status order dari notifikasi Midtrans, **supaya** status pembayaran tetap benar tanpa bergantung pada user kembali ke aplikasi.

| ID | Given | When | Then |
|---|---|---|---|
| AC-1 | notifikasi dengan `signature_key` valid dan status `settlement` | webhook dipanggil | order menjadi `PAID`, response `200` |
| AC-2 | `signature_key` tidak valid | webhook dipanggil | response `401`, status order **tidak** berubah |
| AC-3 | notifikasi yang sama diterima dua kali | webhook dipanggil ulang | status order tetap `PAID`, tidak ada efek samping ganda — **idempoten** |
| AC-4 | notifikasi tiba sebelum user kembali dari halaman pembayaran | user membuka halaman order | status yang tampil sudah `PAID`, tidak menunggu aksi user |

**Catatan:** AC-3 dan AC-4 adalah alasan story ini ditulis terpisah dari `US-H01`.

---

## 6. Story yang masih harus ditulis

Checklist penyelesaian Deliverable #1. Kerjakan per epic, jangan lompat-lompat.

- [ ] **A** Auth — `US-A02` login · `US-A03` logout · `US-A04` refresh token
- [ ] **B** Store — `US-B01` melihat halaman toko
- [ ] **C** Product — `US-C01` list produk · `US-C02` detail produk & varian
- [ ] **D** Browse — `US-D01` daftar produk berpaginasi · `US-D02` filter kategori
- [ ] **E** Cart — `US-E02` ubah qty · `US-E03` hapus item · `US-E04` lihat keranjang
- [ ] **F** Address — `US-F01` tambah alamat · `US-F02` pilih alamat saat checkout
- [ ] **G** Order — `US-G02` riwayat pesanan · `US-G03` detail pesanan
- [ ] **H** Payment — `US-H01` memulai pembayaran (Snap)
- [ ] **I** Shipping — `US-I01` ongkir pada checkout · `US-I02` melihat status pengiriman
- [ ] **J** Seller — `US-J01` daftar order masuk · `US-J02` mengubah status pesanan

Aturan mutu setiap AC — sebelum ditulis, pastikan dia:

1. **Bisa diuji.** Bisa dijawab lulus atau gagal, tanpa perdebatan.
2. **Menyebut hasil yang teramati, bukan cara kerjanya.** Tulis *"response 409 kode STOCK_INSUFFICIENT"*, bukan *"panggil fungsi validateStock"*.
3. **Menyertakan minimal satu jalur gagal.** Story yang hanya punya alur normal belum selesai.

---

## 7. Definition of Ready & Definition of Done

Ditulis pada **Sprint 0 · Deliverable #6**, di `CONTRIBUTING.md` level repo. Ringkasnya: tiket boleh dikerjakan jika AC jelas dan kontrak API sudah disepakati; tiket boleh ditutup jika kode merged, test untuk setiap AC lulus, lint bersih, dan dokumentasi diperbarui.

## 8. Dokumen terkait

| Dokumen | Status |
|---|---|
| `docs/erd.md` | Deliverable #2 — belum dibuat |
| `docs/api/openapi.yaml` | Deliverable #3 — belum dibuat |
| `docs/adr/` | Deliverable #5 — belum dibuat |
| `CONTRIBUTING.md` | Deliverable #6 — belum dibuat |
