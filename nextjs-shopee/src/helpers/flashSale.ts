export const FLASH_SALE_SLOTS = [
  { start: 0, end: 3 },
  { start: 3, end: 6 },
  { start: 6, end: 9 },
  { start: 9, end: 12 },
  { start: 12, end: 15 },
  { start: 15, end: 18 },
  { start: 18, end: 21 },
  { start: 21, end: 24 },
];

const OFFSET = 7; // Offset in hours for UTC+7

export function jadikanWIB(
  tahun: number,
  bulan: number,
  tanggal: number,
  jamWIB: number,
): Date {
  return new Date(Date.UTC(tahun, bulan - 1, tanggal, jamWIB - OFFSET));
}

export function tanggalHariIni() {
  const wib = new Date(Date.now() + OFFSET * 60 * 60 * 1000);
  const tahun = wib.getUTCFullYear();
  const bulan = String(wib.getUTCMonth() + 1).padStart(2, "0");
  const tanggal = String(wib.getUTCDate()).padStart(2, "0");
  return `${tahun}-${bulan}-${tanggal}`;
}
