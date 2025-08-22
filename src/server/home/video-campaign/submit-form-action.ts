/**
 * Server Action untuk memproses formulir pendaftaran tim video campaign.
 *
 * Fungsi ini melakukan serangkaian operasi kritis:
 * 1.  **Validasi Data**: Menggunakan skema Zod untuk memvalidasi data formulir yang diterima dari klien.
 * 2.  **Unggah File**: Mengunggah file `buktiPembayaran` ke Cloudinary.
 * 3.  **Penyimpanan ke Database**: Memasukkan data tim ke `timVideoCampaignTable` dan data peserta ke `pesertaVideoCampaignTable` dalam satu alur.
 * 4.  **Penanganan Error**: Menggunakan blok `try...catch` untuk menangani potensi kesalahan database, seperti pelanggaran `unique constraint`. Jika terjadi kesalahan, fungsi ini akan mencoba melakukan *rollback* dengan menghapus data tim yang sudah dimasukkan.
 *
 * @param registrasiFormData Data formulir yang diterima dari klien, dengan tipe yang telah divalidasi oleh Zod.
 * @returns Sebuah Promise yang mengembalikan `ServerResponseType`.
 * - Jika berhasil: `{ success: true, data: string }` di mana `data` adalah ID unik tim yang baru dibuat.
 * - Jika gagal: `{ success: false, message?: string, error?: unknown }` dengan pesan error yang deskriptif.
 */
"use server";

import { db } from "@/db/drizzle";
import { v4 as uuidv4 } from "uuid";
import { isUniqueConstraintViolationError } from "@/utils/home/is-unique-constraint-error";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { ServerResponseType } from "@/types/server-response-type";
import {
   formPendaftaranTimSchema,
   FormPendaftaranTimSchemaType,
} from "@/zod/home/video-campaign/form-pendaftaran-tim-schema";
import { uploadToCloudinary } from "@/utils/home/upload-to-cloudinary";
import {
   pesertaVideoCampaignTable,
   timVideoCampaignTable,
} from "@/db/schemas/video-campaign-schema";

export async function submitFormAction(
   registrasiFormData: FormPendaftaranTimSchemaType
): Promise<ServerResponseType<string>> {
   const result = formPendaftaranTimSchema.safeParse(registrasiFormData);
   if (!result.success) {
      return {
         success: false,
         error: result.error!.issues.join(", "),
      };
   }

   const { namaTim, noWa, instansi, buktiPembayaran, peserta } = result.data;
   let buktiPembayaranUrl: string | null = null;

   try {
      if (buktiPembayaran instanceof File) {
         const arrayBuffer = await buktiPembayaran.arrayBuffer();
         const buffer = Buffer.from(arrayBuffer);
         buktiPembayaranUrl = await uploadToCloudinary(
            buffer,
            buktiPembayaran.name
         );
      }

      // Insert ke tabel timML
      const insertTim = await db
         .insert(timVideoCampaignTable)
         .values({
            id: uuidv4(),
            namaTim: namaTim,
            noWa,
            instansi,
            buktiPembayaran: buktiPembayaranUrl,
         })
         .returning({ insertedId: timVideoCampaignTable.id });

      // Setelah berhasil, insert ke tabel pesertaML
      const pesertaToInsert = peserta.map((p) => ({
         id: uuidv4(),
         namaTim: namaTim,
         nama: p.nama,
         npm: p.npm,
      }));

      await db.insert(pesertaVideoCampaignTable).values(pesertaToInsert);

      return {
         success: true,
         data: insertTim[0].insertedId,
      };
   } catch (error) {
      await db
         .delete(timVideoCampaignTable)
         .where(eq(timVideoCampaignTable.namaTim, namaTim));
      if (isUniqueConstraintViolationError(error)) {
         if ((error as DrizzleQueryError).cause?.message.includes("npm")) {
            return {
               success: false,
               message: "NPM telah terdaftar.",
            };
         }
      }
      return {
         success: false,
         statusCode: 500,
         error: error,
         message: "Gagal memproses permintaan. Periksa log server.",
      };
   }
}
