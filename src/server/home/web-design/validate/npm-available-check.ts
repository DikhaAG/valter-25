"use server";

import { db } from "@/db/drizzle";
import { pesertaWebDesignTable } from "@/db/schemas/web-design-schema";
import { ServerResponseType } from "@/types/server-response-type";
import type { WebDesignPesertaMahasiswaFormSchemaType } from "@/zod/home/web-design/mahasiswa-form";
import { eq } from "drizzle-orm";

export async function webDesignPesertaNpmAvailableCheck(
   peserta: WebDesignPesertaMahasiswaFormSchemaType
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.pesertaWebDesignTable.findFirst({
         where: eq(pesertaWebDesignTable.npm, peserta.npm!),
      });
      if (res) {
         return {
            success: false,
            message: `NPM ${peserta.npm!} telah terdaftar.`,
         };
      }
   } catch (error) {
      console.log(error);
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
