"use server";

import { db } from "@/lib/drizzle";
import { timVideoCampaignTable } from "@/server/db/schemas/video-campaign-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function noWaCheck(
   noWa: string
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.timVideoCampaignTable.findFirst({
         where: eq(timVideoCampaignTable.noWa, noWa),
      });
      if (res) {
         return {
            success: false,
            message: "Nomor Whatsapp telah terdaftar.",
         };
      }
      return {
         success: true,
      };
   } catch (error) {
      return {
         success: false,
         message: "Terjadi kesalahan pada server.",
         error: error,
         statusCode: 500,
      };
   }
}
