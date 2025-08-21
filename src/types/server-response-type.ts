/**
 * Tipe data generik yang merepresentasikan format standar respons dari server.
 * Digunakan untuk menyatukan struktur data respons, memudahkan penanganan
 * hasil operasi, baik sukses maupun gagal, di sisi klien.
 * * @template T Tipe data dari payload yang diharapkan saat operasi berhasil.
 */
export interface ServerResponseType<T> {
        /**
         * Status keberhasilan dari operasi.
         * Bernilai `true` jika operasi sukses, `false` jika terjadi kesalahan.
         */
        success: boolean;

        /**
         * Pesan informatif terkait hasil operasi.
         * Dapat berisi pesan sukses seperti "Data berhasil ditambahkan" atau pesan error umum.
         * Properti ini bersifat opsional.
         */
        message?: string;

        /**
         * Payload data yang dikirim oleh server saat operasi berhasil.
         * Tipe data dari properti ini ditentukan oleh parameter generik `T`.
         * Properti ini bersifat opsional.
         */
        data?: T;

        /**
         * Informasi detail tentang kesalahan yang terjadi saat operasi gagal.
         * Tipe `unknown` digunakan untuk fleksibilitas karena tipe error bisa bervariasi.
         * Properti ini bersifat opsional.
         */
        error?: unknown;

        /**
         * Kode status HTTP dari respons server.
         * Memberikan konteks lebih lanjut mengenai status operasi.
         * Contoh: `200` untuk OK, `404` untuk Not Found, `500` untuk Server Error.
         * Properti ini bersifat opsional.
         */
        statusCode?: number;
}
