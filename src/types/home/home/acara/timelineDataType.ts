/**
 * Tipe data untuk sebuah event dalam jadwal (timeline) acara.
 * Digunakan untuk merepresentasikan satu entri dalam urutan kronologis acara,
 * seperti "Pembukaan", "Sesi 1", atau "Istirahat".
 */
export type HomeAcaraTimelineDataType = {
        /**
         * Nama atau judul dari event dalam jadwal.
         * @example "Pembukaan dan Sambutan Rektor"
         */
        nama: string;

        /**
         * Tanggal atau waktu pelaksanaan event.
         * Format dapat berupa tanggal lengkap atau rentang waktu.
         * @example "23 November 2025"
         */
        tanggal: string;
};
