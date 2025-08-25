"use server";

import { db } from "@/lib/drizzle";
import { ParticipantAsMahasiswa } from "@/models/esport/registration-form";
import { pesertaEsportTable } from "@/server/db/schemas/esport-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function npmCheck(
   peserta: ParticipantAsMahasiswa
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.pesertaEsportTable.findFirst({
         where: eq(pesertaEsportTable.npm, peserta.npm!),
      });
      if (res) {
         return {
            success: false,
            message: `NPM ${peserta.npm!} telah terdaftar.`,
         };
      }
   } catch (error) {
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
