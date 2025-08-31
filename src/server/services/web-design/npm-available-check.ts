"use server";

import { db } from "@/lib/drizzle";
import { ParticipantAsMahasiswa } from "@/models/web-design/registration-form";
import { pesertaWebDesignTable } from "@/server/db/schemas/web-design-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function npmCheck(
   peserta: ParticipantAsMahasiswa
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


export async function npmCheck2(
    npm: string
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.pesertaWebDesignTable.findFirst({
         where: eq(pesertaWebDesignTable.npm, npm),
      });
      if (res) {
         return {
            success: false,
            message: `NPM ${npm} telah terdaftar.`,
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
