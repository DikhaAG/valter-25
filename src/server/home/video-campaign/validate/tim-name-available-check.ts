"use server";

import { db } from "@/db/drizzle";
import { timVideoCampaignTable } from "@/db/schemas/video-campaign-schema";
import { ServerResponseType } from "@/types/server-response-type";
import { eq } from "drizzle-orm";

export async function videoCampaignTimNameAvailableCheck(
   namaTim: string
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.timVideoCampaignTable.findFirst({
         where: eq(timVideoCampaignTable.namaTim, namaTim),
      });

      if (res) {
         return {
            success: false,
            message: "Nama tim telah dipakai.",
         };
      }
      return {
         success: true,
      };
   } catch (error) {
      console.log("cekKetersediaanNamaTim");
      console.log(error);
      return {
         success: false,
         message: "Terjadi kesalahan pada server.",
         error: error,
         statusCode: 500,
      };
   }
}
