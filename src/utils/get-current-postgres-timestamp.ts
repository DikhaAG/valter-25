/**
 * Mengambil timestamp saat ini dalam format kustom: YYYY-MM-DD HH:mm:ss.sss[xxxxxx]
 * Catatan: JavaScript native hanya mendukung hingga milidetik (tiga digit desimal).
 * Empat digit tambahan ('xxxxxx') adalah placeholder atau harus dihasilkan secara kustom
 * jika diperlukan presisi mikrosekon (umumnya tidak diperlukan untuk sebagian besar aplikasi web).
 *
 * @returns {string} Timestamp terformat.
 */
function getCurrentPostgresTimestamp(): string {
    const now = new Date();

    // Bagian Tanggal dan Waktu (YYYY-MM-DD HH:mm:ss)
    const datePart = now.toISOString().slice(0, 19).replace('T', ' ');

    // Bagian Milidetik (sss)
    // .getMilliseconds() mengembalikan 0-999
    const ms = now.getMilliseconds().toString().padStart(3, '0');

    // Bagian Mikrosekon (Untuk meniru format PostgreSQL/Drizzle)
    // Karena JS hanya memberikan 3 digit (ms), kita tambahkan 3 digit nol (000)
    // untuk memenuhi format enam digit di belakang titik desimal.
    const microsecondPadding = '000'; 

    return `${datePart}.${ms}${microsecondPadding}`;
}

// Contoh Penggunaan
const currentTimestamp = getCurrentPostgresTimestamp();
console.log(currentTimestamp); 

// Output Contoh: 2025-08-25 08:24:52.770000 
// (Waktu dan milidetik akan bervariasi)