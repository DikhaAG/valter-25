import { z } from "zod";

/**
 * Skema validasi untuk data peserta (pemain) esport yang diambil dari database.
 * Tipe ini digunakan saat menampilkan atau memproses data yang sudah tersimpan.
 */
export const pesertaEsportTableSchema = z.object({
        /**
         * ID unik peserta.
         * @example "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d"
         */
        id: z.uuid(),

        /**
         * ID in-game Mobile Legends dari peserta.
         * @example "12345678"
         */
        idML: z.string(),

        /**
         * Nama lengkap peserta. Properti ini bisa `null` jika data tidak tersedia.
         * @example "Budi Santoso"
         */
        nama: z.string().nullable(),

        /**
         * Nomor Pokok Mahasiswa (NPM) dari peserta. Properti ini bisa `null` jika data tidak tersedia.
         * @example "202210010023"
         */
        npm: z.string().nullable(),
});

/**
 * Tipe inferensi untuk skema `pesertaEsportTableSchema`.
 * Digunakan untuk memastikan keamanan tipe data peserta yang diambil dari tabel database.
 */
export type PesertaEsportTableSchemaType = z.infer<
        typeof pesertaEsportTableSchema
>;
