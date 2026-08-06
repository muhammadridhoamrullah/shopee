export function formatHari(expiredAt: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (expiredAt.getTime() - now.getTime()) / 1000,
  );

  if (diffInSeconds < 0) {
    return "Sudah Berakhir";
  }

  const days = Math.floor(diffInSeconds / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);

  if (days > 0) {
    return `${days} hari`;
  }
  if (hours > 0) {
    return `${hours} jam`;
  }
  return `${minutes} menit`;
}
