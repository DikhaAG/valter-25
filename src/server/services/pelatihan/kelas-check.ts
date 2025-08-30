"use server";

import { db } from "@/lib/drizzle";
import { pesertaPelatihanTable } from "@/server/db/schemas/pelatihan";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function kelasCheck(
   kelas: string
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.pesertaPelatihanTable.findFirst({
         where: eq(pesertaPelatihanTable.kelas, kelas),
      });
      if (res) {
         return {
            success: false,
            message: "Kelas telah melakukan pendaftaran.",
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
