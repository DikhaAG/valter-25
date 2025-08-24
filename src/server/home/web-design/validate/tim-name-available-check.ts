"use server";

import { db } from "@/db/drizzle";
import { timWebDesignTable } from "@/db/schemas/web-design-schema";
import { ServerResponseType } from "@/types/server-response-type";
import { eq } from "drizzle-orm";

export async function webDesignTimNameAvailableCheck(
   namaTim: string
): Promise<ServerResponseType<unknown>> {
   try {
      const res = await db.query.timWebDesignTable.findFirst({
         where: eq(timWebDesignTable.namaTim, namaTim),
      });

      if (res) {
         return {
            success: false,
            message: "Nama tim telah dipakai.",
         };
      }
      return {
         success: true,
      };
   } catch (error) {
      console.log("cekKetersediaanNamaTim");
      console.log(error);
      return {
         success: false,
         message: "Terjadi kesalahan pada server.",
         error: error,
         statusCode: 500,
      };
   }
}
