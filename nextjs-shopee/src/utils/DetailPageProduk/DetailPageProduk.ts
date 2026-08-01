export function formatLamaStore(createdAt: Date): string {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - createdAt.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return `${diffInDays} Hari Lalu`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} Bulan Lalu`;
  }
  const years = Math.floor(diffInDays / 365);
  return `${years} Tahun Lalu`;
}
