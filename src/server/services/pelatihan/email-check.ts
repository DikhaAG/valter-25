"use server";

import { db } from "@/lib/drizzle";
import { pesertaPelatihanTable } from "@/server/db/schemas/pelatihan";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function emailCheck(
   email: string
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.pesertaPelatihanTable.findFirst({
         where: eq(pesertaPelatihanTable.email, email),
      });
      if (res) {
         return {
            success: false,
            message: "Email telah terdaftar.",
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
