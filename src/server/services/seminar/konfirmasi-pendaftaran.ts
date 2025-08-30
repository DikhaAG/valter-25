"use server";

import { db } from "@/lib/drizzle";
import { ParticipantTable } from "@/models/seminar/table";
import {
   pendaftaranSeminarKelasTable,
   pesertaSeminarTable,
} from "@/server/db/schemas/seminar-schema";
import { ServerResponseType } from "@/types/server-response";
import { getCurrentPostgresTimestamp } from "@/utils/get-current-postgres-timestamp";
import { eq } from "drizzle-orm";

export async function KonfirmasiPendaftaranKelasSeminar(
   idSeminar: string,
   mahasiswas: ParticipantTable[]
): Promise<ServerResponseType<unknown>> {
   try {
      await db
         .update(pendaftaranSeminarKelasTable)
         .set({
            statusPembayaran: true,
            tanggalKonfirmasi: getCurrentPostgresTimestamp(),
         })
         .where(eq(pendaftaranSeminarKelasTable.id, idSeminar));
      mahasiswas.forEach(async (mahasiswa) => {
         await db
            .update(pesertaSeminarTable)
            .set({
               statusPembayaran: true,
               tanggalKonfirmasi: getCurrentPostgresTimestamp(),
            })
            .where(eq(pesertaSeminarTable.id, mahasiswa.id!));
      });
      return {
         success: true,
      };
   } catch (e) {
      console.log(e);
      await db
         .update(pendaftaranSeminarKelasTable)
         .set({ statusPembayaran: false, tanggalKonfirmasi: null })
         .where(eq(pendaftaranSeminarKelasTable.id, idSeminar));
      mahasiswas.forEach(async (mahasiswa) => {
         await db
            .update(pesertaSeminarTable)
            .set({ statusPembayaran: false, tanggalKonfirmasi: null })
            .where(eq(pesertaSeminarTable.id, mahasiswa.id!));
      });
      return {
         success: false,
         message: `${e}`,
      };
   }
}
