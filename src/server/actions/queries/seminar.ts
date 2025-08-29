"use server";
import { emotError, emotSuccess } from "@/data/emot-response";
import { db } from "@/lib/drizzle";
import {
   ClassRegistrationTable,
   ParticipantTable,
} from "@/models/seminar/table";
import {
   pendaftaranSeminarKelasTable,
   pesertaSeminarTable,
} from "@/server/db/schemas/seminar-schema";
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

export async function getParticipantById(
   id: string
): Promise<ServerResponseType<ParticipantTable>> {
   try {
      const res = await db.query.pesertaSeminarTable.findFirst({
         where: eq(pesertaSeminarTable.id, id),
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

export async function getAllClassRegistration(): Promise<
   ServerResponseType<ClassRegistrationTable[]>
> {
   try {
      const res = await db.query.pendaftaranSeminarKelasTable.findMany({
         with: {
            peserta: true,
         },
      });
      return {
         success: true,
         data: res,
      };
   } catch (e) {
      return {
         success: false,
         message: `${e}`,
      };
   }
}
