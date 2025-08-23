// app/form-schema.ts
import { asEnumSchema } from "@/zod/tables/enums/asEnum";
import { pesertaEsportTableSchema } from "@/zod/tables/esport/peserta";
import { z } from "zod";

/**
 * Skema validasi untuk data tampilan (display) tim esport.
 * Tipe ini digunakan saat mengambil dan menampilkan data tim dari database,
 * bukan untuk validasi formulir pendaftaran.
 */
export const esportRegistrationDisplaySchema = z.object({
   /**
    * ID unik tim.
    * @example "0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d"
    */
   id: z.string(),

   /**
    * Nama unik tim.
    * @example "Tim Sinar Jaya"
    */
   namaTim: z.string(),

   /**
    * Nomor WhatsApp kapten tim. Bisa berupa null jika tidak ada data.
    * @example "081234567890"
    */
   noWa: z.string().nullable(),

   /**
    * Nama instansi (kampus/sekolah) asal tim. Bisa berupa null.
    * @example "Universitas Maju Mundur"
    */
   instansi: z.string().nullable(),

   /**
    * Data bukti pembayaran. Tipe `any` digunakan karena validasi file sudah
    * dilakukan pada tahap pendaftaran.
    */
   buktiPembayaran: z.any(),

   /**
    * Status pembayaran tim. Defaultnya adalah `false`.
    * Digunakan untuk indikator visual di UI.
    */
   statusPembayaran: z.boolean().default(false),

   /**
    * Array berisi data peserta yang terkait dengan tim ini.
    * Tipe datanya divalidasi oleh `pesertaEsportTableSchema`.
    */
   peserta: z.array(pesertaEsportTableSchema),

   as: asEnumSchema,
});

/**
 * Tipe inferensi untuk skema `timDisplaySchema`.
 * Digunakan untuk memastikan keamanan tipe data tim yang diambil dari database.
 */
export type EsportRegistrationDisplaySchemaType = z.infer<
   typeof esportRegistrationDisplaySchema
>;
