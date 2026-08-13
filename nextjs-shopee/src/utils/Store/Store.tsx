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

export function formatLastLogin(lastLogin: Date | null): string {
  if (!lastLogin) {
    return "-";
  }

  const now = new Date();
  const diffInMilliseconds = now.getTime() - lastLogin.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInYears > 0) {
    return `${diffInYears} tahun lalu`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} bulan lalu`;
  } else if (diffInDays > 0) {
    return `${diffInDays} hari lalu`;
  } else if (diffInHours > 0) {
    return `${diffInHours} jam lalu`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} menit lalu`;
  } else {
    return "Baru saja";
  }
}
