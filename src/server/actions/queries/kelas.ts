/**
 * Server Action untuk mengambil data tim esport berdasarkan ID.
 *
 * Fungsi ini melakukan pencarian tim pada database berdasarkan `id` yang diberikan.
 * Data peserta yang terkait dengan tim juga akan ikut diambil (relasi one-to-many).
 *
 * @param id ID unik tim yang akan dicari.
 * @returns Sebuah Promise yang mengembalikan `ServerResponseType`.
 * - Jika tim ditemukan: `{ success: true, message: string, data: TimDisplaySchemaType }`
 * dengan data tim dan peserta.
 * - Jika tim tidak ditemukan: `{ success: false, message: "Data tim tidak ditemukan" }`.
 * - Jika terjadi kesalahan pada server: `{ success: false, message: "Terjadi kesalahan...", error: unknown }`.
 */
"use server";

import { emotError, emotSuccess } from "@/data/emot-response";
import { ServerResponseType } from "@/types/server-response";
import { db } from "@/lib/drizzle";
import { KelasTableSchema, ProdiTableSchema } from "@/models/kelas/table";

export async function getAllProdiWithKelas(): Promise<
   ServerResponseType<ProdiTableSchema[]>
> {
   try {
      const res = await db.query.prodiTable.findMany({
         with: { kelas: true },
      });
      if (!res) {
         return {
            success: false,
            message: `Data tim tidak ditemukan ${emotError}`,
         };
      }
      return {
         success: true,
         message: `Berhasil mengambil data Program Studi. ${emotSuccess}`,
         data: res,
      };
   } catch (error) {
      return {
         success: false,
         message: `Terjadi kesalahan dalam mengambil data Program Studi ${emotError}`,
         error,
      };
   }
}

export async function getAllKelas(): Promise<
   ServerResponseType<KelasTableSchema[]>
> {
   try {
      const res = await db.query.kelasTable.findMany({});
      if (!res) {
         return {
            success: false,
            message: `Data tim tidak ditemukan ${emotError}`,
         };
      }
      return {
         success: true,
         message: `Berhasil mengambil data Program Studi. ${emotSuccess}`,
         data: res,
      };
   } catch (error) {
      return {
         success: false,
         message: `Terjadi kesalahan dalam mengambil data Program Studi ${emotError}`,
         error,
      };
   }
}
