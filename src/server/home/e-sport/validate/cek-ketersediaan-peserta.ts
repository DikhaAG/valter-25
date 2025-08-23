/**
 * Server Action untuk mengecek ketersediaan data pemain (ID ML dan NPM).
 *
 * Fungsi ini mengiterasi setiap pemain dan melakukan validasi serta pengecekan
 * ke database secara berurutan. Jika ada salah satu data (ID ML atau NPM) yang
 * sudah terdaftar, fungsi akan langsung mengembalikan error.
 *
 * @param peserta Array dari objek peserta yang berisi data ID ML, nama, dan NPM.
 * @returns Sebuah Promise yang mengembalikan `ServerResponseType`.
 * - Jika semua pemain tersedia: `{ success: true }`.
 * - Jika ada data yang tidak valid atau sudah terdaftar: `{ success: false, message: string }`
 * dengan pesan error yang spesifik.
 * - Jika terjadi kesalahan server: `{ success: false, message: "Terjadi kesalahan pada server." }`.
 */
"use server";

import { db } from "@/db/drizzle";
import { pesertaEsportTable } from "@/db/schemas/esport-schema";
import { ServerResponseType } from "@/types/server-response-type";
import { isNumeric } from "@/utils/home/is-numeric";
import { FormPendaftaranPesertaSchemaType } from "@/zod/home/e-sport/mahasiswa-form";
import { EsportPesertaUmumFormSchemaType } from "@/zod/home/e-sport/umum-form";
import { eq } from "drizzle-orm";

export async function esportPesertaAvailableCheck(
   pesertas:
      | FormPendaftaranPesertaSchemaType[]
      | FormPendaftaranPesertaUmumSchemaType[],
   as: string
): Promise<ServerResponseType<unknown>> {
   try {
      pesertas.map(async (peserta) => {
         const cekIdMLRes = await db.query.pesertaEsportTable.findFirst({
            where: eq(pesertaEsportTable.idML, peserta.idML),
         });
         if (cekIdMLRes) {
            return {
               success: false,
               message: `ID ML ${peserta.idML} telah terdaftar.`,
               path: "idML",
            };
         }
         if (as === "mahasiswa") {
            if (
               !isNumeric((peserta as FormPendaftaranPesertaSchemaType).npm!)
            ) {
               return {
                  success: false,
                  message: `NPM tidak valid!.`,
                  path: "npm",
               };
            }
            const cekNpmRes = await db.query.pesertaEsportTable.findFirst({
               where: eq(
                  pesertaEsportTable.npm,
                  (peserta as FormPendaftaranPesertaSchemaType).npm!
               ),
            });
            if (cekNpmRes) {
               return {
                  success: false,
                  message: `NPM ${(peserta as FormPendaftaranPesertaSchemaType)
                     .npm!} telah terdaftar.`,
                  path: "npm",
               };
            }
         }
      });
   } catch (error) {
      return {
         success: false,
         message: "Terjadi kesalahan pada server.",
         error: error,
         statusCode: 500,
      };
   }
   return {
      success: true,
   };
}
