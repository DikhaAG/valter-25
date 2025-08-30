export function formatTimestamp(timestamp: Date | string): string {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Menggunakan format 24-jam
    timeZone: 'Asia/Jakarta', // Opsional: Pastikan zona waktu yang benar
  };

  const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
  
  return formattedDate;
}
