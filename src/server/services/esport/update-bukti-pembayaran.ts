/**
 * Server Action untuk memperbarui bukti pembayaran tim esport.
 *
 * Fungsi ini menerima file gambar baru dan nama tim, lalu mengunggahnya ke Cloudinary
 * dan memperbarui URL gambar di database.
 *
 * @param {object} params - Objek parameter.
 * @param {File} params.file - File gambar baru yang akan diunggah.
 * @param {string} params.namaTim - Nama tim yang bukti pembayarannya akan diperbarui.
 * @returns {Promise<object>} Sebuah promise yang mengembalikan objek dengan properti `success` jika berhasil, atau `error` jika gagal.
 * - Jika berhasil: `{ success: true }`.
 * - Jika gagal: `{ error: string }` dengan pesan kesalahan.
 */
"use server";
import { ServerResponseType } from "@/types/server-response";
import {
   ACCEPTED_IMAGE_TYPES,
   MAX_FILE_SIZE_KB,
} from "@/utils/image-upload-requirements";
import { uploadToCloudinary } from "@/server/services/upload-to-cloudinary";
import { db } from "@/lib/drizzle";
import { timEsportTable } from "@/server/db/schemas/esport-schema";
import { eq } from "drizzle-orm";

// --- SERVER ACTION UNTUK UPDATE GAMBAR ---
export async function updateBuktiPembayaran({
   file,
   namaTim,
}: {
   file: File;
   namaTim: string;
}): Promise<ServerResponseType<unknown>> {
   if (!file) {
      return { message: "File tidak ditemukan.", success: false };
   }

   if (!namaTim) {
      return { message: "Nama tim tidak ditemukan.", success: false };
   }

   if (
      !ACCEPTED_IMAGE_TYPES.includes(file.type) ||
      file.size > MAX_FILE_SIZE_KB * 1024
   ) {
      return {
         success: false,
         message: "Jenis atau ukuran file tidak valid.",
      };
   }

   try {
      const imageUrl = await uploadToCloudinary(file, file.name);
      await db
         .update(timEsportTable)
         .set({ buktiPembayaran: imageUrl, namaTim })
         .where(eq(timEsportTable.namaTim, namaTim));
      return { success: true };
   } catch (error) {
      return {
         message: "Gagal memperbarui gambar.",
         error: error,
         success: false,
      };
   }
}
