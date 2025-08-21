/**
 * Server Action untuk mengecek ketersediaan nama tim dalam database.
 *
 * Fungsi ini mencari apakah `namaTim` yang diberikan sudah terdaftar di
 * tabel `timEsportTable`. Ini digunakan untuk validasi formulir agar tidak
 * ada duplikasi nama tim.
 *
 * @param namaTim Nama tim yang akan dicek.
 * @returns Sebuah Promise yang mengembalikan `ServerResponseType`.
 * - Jika nama tim tersedia (belum terdaftar): `{ success: true }`.
 * - Jika nama tim sudah terdaftar: `{ success: false, message: "Nama tim telah dipakai." }`.
 * - Jika terjadi kesalahan server: `{ success: false, message: "Terjadi kesalahan...", statusCode: 500 }`.
 */
"use server";

import { db } from "@/db/drizzle";
import { timEsportTable } from "@/db/schemas/esport-schema";
import { ServerResponseType } from "@/types/server-response-type";
import { eq } from "drizzle-orm";

export async function cekKetersediaanNamaTim(
        namaTim: string
): Promise<ServerResponseType<unknown>> {
        try {
                const res = await db.query.timEsportTable.findFirst({
                        where: eq(timEsportTable.namaTim, namaTim),
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
