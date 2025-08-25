"use server";

import { db } from "@/lib/drizzle";
import { pesertaVideoCampaignTable } from "@/server/db/schemas/video-campaign-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function npmCheck(
   npm: string
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.pesertaVideoCampaignTable.findFirst({
         where: eq(pesertaVideoCampaignTable.npm, npm),
      });
      if (res) {
         return {
            success: false,
            message: `NPM ${npm} telah terdaftar.`,
         };
      }
   } catch (error) {
      console.log(error);
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
