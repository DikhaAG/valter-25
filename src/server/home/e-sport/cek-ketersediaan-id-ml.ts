"use server";

import { db } from "@/db/drizzle";
import { pesertaEsportTable } from "@/db/schemas/esport-schema";
import { ServerResponseType } from "@/types/server-response-type";
import { FormPendaftaranPesertaSchemaType } from "@/zod/home/e-sport/form-pendaftaran-tim-schema";
import { eq } from "drizzle-orm";

export async function cekKetersediaanIdMl(
   peserta: FormPendaftaranPesertaSchemaType
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.pesertaEsportTable.findFirst({
         where: eq(pesertaEsportTable.idML, peserta.idML),
      });
      if (res) {
         return {
            success: false,
            message: `ID ${peserta.idML!} telah terdaftar.`,
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
