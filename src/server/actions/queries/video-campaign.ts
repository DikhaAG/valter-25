"use server";

import { emotError, emotSuccess } from "@/data/emot-response";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";
import type { TeamTable } from "@/models/video-campaign/table";
import { timVideoCampaignTable } from "@/server/db/schemas/video-campaign-schema";
import { db } from "@/lib/drizzle";

export async function getTeamById(
   id: string
): Promise<ServerResponseType<TeamTable>> {
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
