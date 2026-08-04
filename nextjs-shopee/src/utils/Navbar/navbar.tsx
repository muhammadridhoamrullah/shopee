// Karakter seperti ( [ * ? punya arti khusus di regex. Kalau user mengetiknya
// di kotak pencarian dan tidak di-escape, query-nya bisa error atau berperilaku aneh
export function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
