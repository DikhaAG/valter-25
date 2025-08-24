"use server";

import { db } from "@/db/drizzle";
import { timWebDesignTable } from "@/db/schemas/web-design-schema";
import { ServerResponseType } from "@/types/server-response-type";
import { eq } from "drizzle-orm";

export async function webDesignNoWaAvaliableCheck(
   noWa: string
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.timWebDesignTable.findFirst({
         where: eq(timWebDesignTable.noWa, noWa),
      });
      if (res) {
         return {
            success: false,
            message: "Nomor Whatsapp telah terdaftar.",
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
