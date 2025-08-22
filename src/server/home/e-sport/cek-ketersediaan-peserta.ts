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
import { isNumeric } from "@/utils/is-numeric";
import { FormPendaftaranPesertaSchemaType } from "@/zod/home/e-sport/form-pendaftaran-tim-schema";
import { eq } from "drizzle-orm";

export async function cekKetersediaanPeserta(
        peserta: FormPendaftaranPesertaSchemaType[]
): Promise<ServerResponseType<unknown>> {
        for (const p of peserta) {
                try {
                        if (!isNumeric(p.npm)) {
                                return {
                                        success: false,
                                        message: `NPM hanya boleh mengandung angka.`,
                                };
                        }

                        const cekIdMLRes =
                                await db.query.pesertaEsportTable.findFirst({
                                        where: eq(
                                                pesertaEsportTable.idML,
                                                p.idML
                                        ),
                                });
                        if (cekIdMLRes) {
                                return {
                                        success: false,
                                        message: `ID ML ${p.idML} tim telah dipakai.`,
                                };
                        }

                        const cekNpmRes =
                                await db.query.pesertaEsportTable.findFirst({
                                        where: eq(
                                                pesertaEsportTable.npm,
                                                p.npm!
                                        ),
                                });
                        if (cekNpmRes) {
                                return {
                                        success: false,
                                        message: `NPM ${p.npm} tim telah dipakai.`,
                                };
                        }
                } catch (error) {
                        return {
                                success: false,
                                message: "Terjadi kesalahan pada server.",
                                error: error,
                                statusCode: 500,
                        };
                }
        }
        return {
                success: true,
        };
}
