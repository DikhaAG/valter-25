"use server";
import { emotError, emotSuccess } from "@/data/emot-response";
import { db } from "@/lib/drizzle";
import { ClassRegistrationTable } from "@/models/seminar/table";
import { pendaftaranSeminarKelasTable } from "@/server/db/schemas/seminar-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function getClassRegistrationById(
   id: string
): Promise<ServerResponseType<ClassRegistrationTable>> {
   try {
      const res = await db.query.pendaftaranSeminarKelasTable.findFirst({
         with: {
            peserta: true,
         },
         where: eq(pendaftaranSeminarKelasTable.id, id),
      });
      if (!res) {
         return {
            success: false,
            message: `Data pendaftaran kelas tidak ditemukan ${emotError}`,
         };
      }
      return {
         success: true,
         message: `Berhasil mengambil data pendaftaran kelas. ${emotSuccess}`,
         data: res,
      };
   } catch (error) {
      return {
         success: false,
         message: `Terjadi kesalahan dalam mengambil data pendaftaran kelas ${emotError}`,
         error,
      };
   }
}
