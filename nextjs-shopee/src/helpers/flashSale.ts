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
