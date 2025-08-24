"use server";

import { db } from "@/db/drizzle";
import { emotError, emotSuccess } from "@/data/emot-response";
import { ServerResponseType } from "@/types/server-response-type";
import { eq } from "drizzle-orm";
import type { VideoCampaignRegistrationDisplaySchemaType } from "@/zod/home/video-campaign/detail-pendaftaran/display";
import { timVideoCampaignTable } from "@/db/schemas/video-campaign-schema";

export async function getTimVideoCampaignById(
   id: string
): Promise<ServerResponseType<VideoCampaignRegistrationDisplaySchemaType>> {
   try {
      const res = await db.query.timVideoCampaignTable.findFirst({
         with: { peserta: true },
         where: eq(timVideoCampaignTable.id, id),
      });
      if (!res) {
         return {
            success: false,
            message: `Data tim tidak ditemukan ${emotError}`,
         };
      }
      return {
         success: true,
         message: `Berhasil mengambil data tim. ${emotSuccess}`,
         data: res,
      };
   } catch (error) {
      return {
         success: false,
         message: `Terjadi kesalahan dalam mengambil data tim ${emotError}`,
         error,
      };
   }
}
