"use server";

import { db } from "@/db/drizzle";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { ServerResponseType } from "@/types/server-response-type";
import { uploadToCloudinary } from "@/utils/home/upload-to-cloudinary";
import {
   VideoCampaignTimUmumFormSchemaType,
   videoCampaignTimUmumFormSchema,
} from "@/zod/home/video-campaign/umum-form";
import {
   pesertaVideoCampaignTable,
   timVideoCampaignTable,
} from "@/db/schemas/video-campaign-schema";

export async function videoCampaignUmumSubmitFormAction(
   registrasiFormData: VideoCampaignTimUmumFormSchemaType
): Promise<ServerResponseType<string>> {
   const result = await videoCampaignTimUmumFormSchema.parseAsync(
      registrasiFormData
   );

   const { namaTim, noWa, buktiPembayaran, peserta } = result;
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
            as: "umum",
            namaTim: namaTim,
            noWa,
            buktiPembayaran: buktiPembayaranUrl!,
         })
         .returning({ insertedId: timVideoCampaignTable.id });

      // Setelah berhasil, insert ke tabel pesertaML
      const pesertaToInsert = peserta.map((p) => ({
         id: uuidv4(),
         namaTim: namaTim,
         nama: p.nama,
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
      return {
         success: false,
         statusCode: 500,
         error: error,
         message: "Gagal memproses permintaan. Periksa log server.",
      };
   }
}
