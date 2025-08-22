/**
 * Tipe data untuk header acara pada halaman utama.
 * Digunakan untuk menampilkan detail acara seperti gambar, judul, deskripsi,
 * htm, informasi pembayaran, dan kontak person.
 */
export type HeaderDataType = {
        /**
         * URL gambar utama acara
         * gambar cek di folder /public/images
         * @example "valter.png"
         */
        img: string;

        /**
         * Judul atau nama lengkap dari acara.
         * @example "E-sport: Mobile Legends"
         */
        title: string;

        /**
         * Deskripsi singkat atau ringkasan dari acara.
         * @example "Turnamen Mobile Legends yang terbuka untuk seluruh mahasiswa."
         */
        desc: string;

        /**
         * Informasi harga tiket masuk atau biaya pendaftaran acara.
         * @example "HTM Rp 45.000"
         */
        htm: string;

        /**
         * Array berisi detail metode pembayaran untuk acara.
         */
        pembayaran: {
                /**
                 * Nama pemilik rekening atau platform pembayaran.
                 * @example "BCA"
                 */
                nama: string;

                /**
                 * Nomor rekening, nomor e-wallet, atau detail kontak pembayaran lainnya.
                 * @example "081234567890"
                 */
                nomor: string;
        }[];

        /**
         * Array berisi detail kontak person yang dapat dihubungi.
         */
        cp: {
                /**
                 * Nama dari kontak person.
                 * @example "Arik"
                 */
                nama: string;

                /**
                 * Nomor WA
                 * @example "0811-2233-4455"
                 */
                kontak: string;
        }[];
};
