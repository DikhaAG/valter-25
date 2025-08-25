"use server";

import { db } from "@/lib/drizzle";
import { timVideoCampaignTable } from "@/server/db/schemas/video-campaign-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function codeCheck(
   kode: string
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.timVideoCampaignTable.findFirst({
         where: eq(timVideoCampaignTable.id, kode),
      });
      if (!res) {
         return {
            success: false,
            message: "Kode tidak ditemukan",
         };
      }
      return {
         success: true,
      };
   } catch (error) {
      console.log(error);
      return {
         success: false,
         message: "Terjadi kesalahan dalam mengecek kode unik.",
         error: error,
      };
   }
}
