/**
 * Server Action untuk memproses formulir pendaftaran tim esport.
 *
 * Fungsi ini melakukan serangkaian operasi kritis:
 * 1.  **Validasi Data**: Menggunakan skema Zod untuk memvalidasi data formulir yang diterima dari klien.
 * 2.  **Unggah File**: Mengunggah file `buktiPembayaran` ke Cloudinary.
 * 3.  **Penyimpanan ke Database**: Memasukkan data tim ke `timEsportTable` dan data peserta ke `pesertaEsportTable` dalam satu alur.
 * 4.  **Penanganan Error**: Menggunakan blok `try...catch` untuk menangani potensi kesalahan database, seperti pelanggaran `unique constraint`. Jika terjadi kesalahan, fungsi ini akan mencoba melakukan *rollback* dengan menghapus data tim yang sudah dimasukkan.
 *
 * @param registrasiFormData Data formulir yang diterima dari klien, dengan tipe yang telah divalidasi oleh Zod.
 * @returns Sebuah Promise yang mengembalikan `ServerResponseType`.
 * - Jika berhasil: `{ success: true, data: string }` di mana `data` adalah ID unik tim yang baru dibuat.
 * - Jika gagal: `{ success: false, message?: string, error?: unknown }` dengan pesan error yang deskriptif.
 */
"use server";

import { v4 as uuidv4 } from "uuid";
import { isUniqueConstraintViolationError } from "@/utils/is-unique-constraint-error";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { ServerResponseType } from "@/types/server-response";
import {
   pesertaEsportTable,
   timEsportTable,
} from "@/server/db/schemas/esport-schema";
import { uploadToCloudinary } from "@/server/services/upload-to-cloudinary";
import {
   ParticipantAsMahasiswa,
   teamAsGeneral,
   TeamAsGeneral,
   teamAsMahasiswa,
   TeamAsMahasiswa,
} from "@/models/esport/registration-form";
import { db } from "@/lib/drizzle";

export async function registration({
   data,
}: {
   data: TeamAsMahasiswa | TeamAsGeneral;
}): Promise<ServerResponseType<string>> {
   let result: TeamAsMahasiswa | TeamAsGeneral;
   const { as } = data;
   try {
      if (as === "mahasiswa") {
         result = await teamAsMahasiswa.parseAsync(data);
      } else if (as === "umum") {
         result = await teamAsGeneral.parseAsync(data);
      }
   } catch (error) {
      return {
         success: false,
         message: "Data yang diberikan tidak valid!.",
         error: error,
      };
   }
   if (!result!) {
      return {
         success: false,
         message: "Data yang diberikan tidak valid!.",
      };
   }

   try {
      const buktiPembayaranUrl = await uploadToCloudinary(
         result.buktiPembayaran,
         result.buktiPembayaran.name
      );

      // Insert ke tabel timML
      const insertTim = await db
         .insert(timEsportTable)
         .values({
            id: uuidv4(),
            as: "mahasiswa",
            namaTim: result.namaTim,
            noWa: result.noWa,
            instansi: (result as TeamAsMahasiswa).instansi,
            buktiPembayaran: buktiPembayaranUrl,
         })
         .returning({ insertedId: timEsportTable.id });

      // Setelah berhasil, insert ke tabel pesertaML
      const pesertaToInsert = result.peserta.map((p) => ({
         id: uuidv4(),
         namaTim: result.namaTim,
         idML: p.idML,
         nama: p.nama,
         npm: (p as ParticipantAsMahasiswa).npm,
      }));

      await db.insert(pesertaEsportTable).values(pesertaToInsert);

      return {
         success: true,
         data: insertTim[0].insertedId,
      };
   } catch (error) {
      await db
         .delete(timEsportTable)
         .where(eq(timEsportTable.namaTim, result.namaTim));
      if (isUniqueConstraintViolationError(error)) {
         if ((error as DrizzleQueryError).cause?.message.includes("id_ml")) {
            return {
               success: false,
               message: "ID telah terdaftar.",
            };
         } else if (
            (error as DrizzleQueryError).cause?.message.includes("npm")
         ) {
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
