"use server";

import { uploadToCloudinary } from "../../../../utils/home/upload-to-cloudinary";
import { db } from "@/db/drizzle";
import { v4 as uuidv4 } from "uuid";
import { isUniqueConstraintViolationError } from "@/utils/home/is-unique-constraint-error";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { ServerResponseType } from "@/types/server-response-type";
import {
   videoCampaignTimMahasiswaFormSchema,
   VideoCampaignTimMahasiswaFormSchemaType,
} from "@/zod/home/video-campaign/mahasiswa-form";
import {
   pesertaVideoCampaignTable,
   timVideoCampaignTable,
} from "@/db/schemas/video-campaign-schema";

export async function videoCampaignMahasiswaSubmitFormAction(
   registrasiFormData: VideoCampaignTimMahasiswaFormSchemaType
): Promise<ServerResponseType<string>> {
   const result = await videoCampaignTimMahasiswaFormSchema.parseAsync(
      registrasiFormData
   );

   const { namaTim, noWa, instansi, buktiPembayaran, peserta } = result;
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
            as: "mahasiswa",
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
