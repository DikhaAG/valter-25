"use server";

import { db } from "@/db/drizzle";
import { timWebDesignTable } from "@/db/schemas/web-design-schema";
import { ServerResponseType } from "@/types/server-response-type";
import { eq } from "drizzle-orm";

export async function webDesignTimRegistrationCodeCheck(
   kode: string
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.timWebDesignTable.findFirst({
         where: eq(timWebDesignTable.id, kode),
      });
      if (!res) {
         return {
            success: false,
            message: "Kode tidak ditemukan",
         };
      }
      return {
         success: true,
      };
   } catch (error) {
      console.log(error);
      return {
         success: false,
         message: "Terjadi kesalahan dalam mengecek kode unik.",
         error: error,
      };
   }
}
