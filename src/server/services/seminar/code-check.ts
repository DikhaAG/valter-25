/**
 * Server Action untuk mengecek keberadaan kode unik tim dalam database.
 * * Fungsi ini mengambil sebuah string `kode` dan mencari tim yang sesuai dengan ID tersebut di tabel `timEsportTable`.
 * Ini berguna untuk validasi cepat atau pencarian data tim berdasarkan ID.
 *
 * @param kode Kode unik (ID) tim yang akan dicari.
 * @returns Sebuah Promise yang mengembalikan `ServerResponseType`.
 * - Jika tim ditemukan: `{ success: true }`.
 * - Jika tim tidak ditemukan: `{ success: false, message: "Kode tidak ditemukan" }`.
 * - Jika terjadi kesalahan server: `{ success: false, message: "Terjadi kesalahan...", error: unknown }`.
 */
"use server";

import { db } from "@/lib/drizzle";
import {
   pendaftaranSeminarKelasTable,
   pesertaSeminarTable,
} from "@/server/db/schemas/seminar-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function codeCheck(
   kode: string
): Promise<ServerResponseType<unknown>> {
   try {
      const pesertaRes = await db.query.pesertaSeminarTable.findFirst({
         where: eq(pesertaSeminarTable.id, kode),
      });
      const kelasRes = await db.query.pendaftaranSeminarKelasTable.findFirst({
         where: eq(pendaftaranSeminarKelasTable.id, kode),
      });
      if (!kelasRes || !pesertaRes) {
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
