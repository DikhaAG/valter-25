"use server";

import { db } from "@/db/drizzle";
import { pesertaEsportTable } from "@/db/schemas/esport-schema";
import { ServerResponseType } from "@/types/server-response-type";
import type { EsportPesertaMahasiswaFormSchema } from "@/zod/home/e-sport/mahasiswa-form";
import { eq } from "drizzle-orm";

export async function EsportPesertaNpmAvailableCheck(
   peserta: EsportPesertaMahasiswaFormSchema
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
