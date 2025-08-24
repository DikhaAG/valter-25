"use server";

import { db } from "@/db/drizzle";
import { pesertaVideoCampaignTable } from "@/db/schemas/video-campaign-schema";
import { ServerResponseType } from "@/types/server-response-type";
import type { VideoCampaignPesertaMahasiswaFormSchemaType } from "@/zod/home/video-campaign/mahasiswa-form";
import { eq } from "drizzle-orm";

export async function videoCampaignPesertaNpmAvailableCheck(
   peserta: VideoCampaignPesertaMahasiswaFormSchemaType
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.pesertaVideoCampaignTable.findFirst({
         where: eq(pesertaVideoCampaignTable.npm, peserta.npm!),
      });
      if (res) {
         return {
            success: false,
            message: `NPM ${peserta.npm!} telah terdaftar.`,
         };
      }
   } catch (error) {
      console.log(error)
      return {
         success: false,
         message: "Terjadi kesalahan pada server.",
         error: error,
         statusCode: 500,
      };
   }
   return {
      success: true,
   };
}
