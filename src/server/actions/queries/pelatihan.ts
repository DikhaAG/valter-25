"use server";
import { emotError, emotSuccess } from "@/data/emot-response";
import { db } from "@/lib/drizzle";
import {
   ClassRegistrationTable,
   ParticipantTable,
} from "@/models/pelatihan/table";
import {
   pendaftaranPelatihanKelasTable,
   pesertaPelatihanTable,
} from "@/server/db/schemas/pelatihan";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function getClassRegistrationById(
   id: string
): Promise<ServerResponseType<ClassRegistrationTable>> {
   try {
      const res = await db.query.pendaftaranPelatihanKelasTable.findFirst({
         with: {
            peserta: true,
         },
         where: eq(pendaftaranPelatihanKelasTable.id, id),
      });
      if (!res) {
         return {
            success: false,
            message: `Data kelas tidak ditemukan ${emotError}`,
         };
      }
      return {
         success: true,
         message: `Berhasil mengambil data kelas. ${emotSuccess}`,
         data: res,
      };
   } catch (error) {
      return {
         success: false,
         message: `Terjadi kesalahan dalam mengambil data kelas ${emotError}`,
         error,
      };
   }
}

export async function getParticipantById(
   id: string
): Promise<ServerResponseType<ParticipantTable>> {
   try {
      const res = await db.query.pesertaPelatihanTable.findFirst({
         where: eq(pesertaPelatihanTable.id, id),
      });
      if (!res) {
         return {
            success: false,
            message: `Data peserta tidak ditemukan ${emotError}`,
         };
      }
      return {
         success: true,
         message: `Berhasil mengambil data peserta. ${emotSuccess}`,
         data: res,
      };
   } catch (error) {
      return {
         success: false,
         message: `Terjadi kesalahan dalam mengambil data peserta ${emotError}`,
         error,
      };
   }
}
