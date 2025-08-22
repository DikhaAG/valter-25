/**
 * Server Action untuk mengambil data tim lomba video campaign berdasarkan ID.
 *
 * Fungsi ini melakukan pencarian tim pada database berdasarkan `id` yang diberikan.
 * Data peserta yang terkait dengan tim juga akan ikut diambil (relasi one-to-many).
 *
 * @param id ID unik tim yang akan dicari.
 * @returns Sebuah Promise yang mengembalikan `ServerResponseType`.
 * - Jika tim ditemukan: `{ success: true, message: string, data: TimDisplaySchemaType }`
 * dengan data tim dan peserta.
 * - Jika tim tidak ditemukan: `{ success: false, message: "Data tim tidak ditemukan" }`.
 * - Jika terjadi kesalahan pada server: `{ success: false, message: "Terjadi kesalahan...", error: unknown }`.
 */
"use server";

import { db } from "@/db/drizzle";
import { emotError, emotSuccess } from "@/data/emot-response";
import { ServerResponseType } from "@/types/server-response-type";
import { eq } from "drizzle-orm";
import { TimDisplaySchemaType } from "@/zod/home/video-campaign/detail-pendaftaran/tim-display-schema";
import { timVideoCampaignTable } from "@/db/schemas/video-campaign-schema";

export async function getTimById(
   id: string
): Promise<ServerResponseType<TimDisplaySchemaType>> {
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
