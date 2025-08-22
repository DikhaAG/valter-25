/**
 * Server Action untuk mengecek ketersediaan nomor WhatsApp dalam database.
 * * Fungsi ini mencari apakah nomor WhatsApp yang diberikan sudah terdaftar
 * di tabel `timWebDesignTable`. Ini berguna untuk validasi formulir agar tidak
 * ada duplikasi nomor kontak.
 *
 * @param noWa Nomor WhatsApp yang akan dicek.
 * @returns Sebuah Promise yang mengembalikan `ServerResponseType`.
 * - Jika nomor tersedia (belum terdaftar): `{ success: true }`.
 * - Jika nomor sudah terdaftar: `{ success: false, message: "Nomor Whatsapp telah terdaftar." }`.
 * - Jika terjadi kesalahan server: `{ success: false, message: "Terjadi kesalahan...", statusCode: 500 }`.
 */
"use server";

import { db } from "@/db/drizzle";
import { timWebDesignTable } from "@/db/schemas/web-design-schema";
import { ServerResponseType } from "@/types/server-response-type";
import { eq } from "drizzle-orm";

export async function cekKetersediaanNoWa(
        noWa: string
): Promise<ServerResponseType<unknown>> {
        try {
                const res = await db.query.timWebDesignTable.findFirst({
                        where: eq(timWebDesignTable.noWa, noWa),
                });
                if (res) {
                        return {
                                success: false,
                                message: "Nomor Whatsapp telah terdaftar.",
                        };
                }
                return {
                        success: true,
                };
        } catch (error) {
                return {
                        success: false,
                        message: "Terjadi kesalahan pada server.",
                        error: error,
                        statusCode: 500,
                };
        }
}
