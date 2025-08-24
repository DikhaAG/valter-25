"use server";

import { db } from "@/db/drizzle";
import { emotError, emotSuccess } from "@/data/emot-response";
import { ServerResponseType } from "@/types/server-response-type";
import { eq } from "drizzle-orm";
import { timEsportTable } from "@/db/schemas/esport-schema";
import { EsportRegistrationDisplaySchemaType } from "@/zod/home/e-sport/detail-pendaftaran/display";

export async function getTimById(
   id: string
): Promise<ServerResponseType<EsportRegistrationDisplaySchemaType>> {
   try {
      const res = await db.query.timEsportTable.findFirst({
         with: { peserta: true },
         where: eq(timEsportTable.id, id),
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
