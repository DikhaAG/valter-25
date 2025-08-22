import { z } from "zod";

/**
 * Skema validasi untuk data peserta lomba web design yang diambil dari database.
 * Tipe ini digunakan saat menampilkan atau memproses data yang sudah tersimpan.
 */
export const pesertaWebDesignTableSchema = z.object({
   /**
    * ID unik peserta.
    * @example "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d"
    */
   id: z.uuid(),

   namaTim: z.string(),

   /**
    * Nomor Pokok Mahasiswa (NPM) dari peserta. Properti ini bisa `null` jika data tidak tersedia.
    * @example "202210010023"
    */
   npm: z.string().nullable(),

   /**
    * Nama lengkap peserta. Properti ini bisa `null` jika data tidak tersedia.
    * @example "Budi Santoso"
    */
   nama: z.string().nullable(),

   /**
    * Timestamp saat data pertama kali dibuat.
    */
   createdat: z.string(),

   /**
    * Timestamp saat data terakhir diperbarui.
    */
   updatedat: z.string(),
});

/**
 * Tipe inferensi untuk skema `pesertaEsportTableSchema`.
 * Digunakan untuk memastikan keamanan tipe data peserta yang diambil dari tabel database.
 */
export type PesertaWebDesignTableSchemaType = z.infer<
   typeof pesertaWebDesignTableSchema
>;
