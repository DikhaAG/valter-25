"use server";
import { eq } from "drizzle-orm";
import { timVideoCampaignTable } from "@/server/db/schemas/video-campaign-schema";
import { ServerResponseType } from "@/types/server-response";
import {
   ACCEPTED_IMAGE_TYPES,
   MAX_FILE_SIZE_KB,
} from "@/utils/image-upload-requirements";
import { uploadToCloudinary } from "@/server/services/upload-to-cloudinary";
import { db } from "@/lib/drizzle";

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
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Unggah gambar baru ke Cloudinary
      const imageUrl = await uploadToCloudinary(buffer, file.name);

      // Perbarui URL gambar di database
      await db
         .update(timVideoCampaignTable)
         .set({ buktiPembayaran: imageUrl })
         .where(eq(timVideoCampaignTable.namaTim, namaTim));

      return { success: true };
   } catch (error) {
      return {
         message: "Gagal memperbarui gambar.",
         error: error,
         success: false,
      };
   }
}
