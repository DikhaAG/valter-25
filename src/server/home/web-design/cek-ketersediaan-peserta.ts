/**
 * Server Action untuk mengecek ketersediaan data peserta (NPM).
 *
 * Fungsi ini mengiterasi setiap peserta dan melakukan validasi serta pengecekan
 * ke database secara berurutan. Jika ada salah satu data (NPM) yang
 * sudah terdaftar, fungsi akan langsung mengembalikan error.
 *
 * @param peserta Array dari objek peserta yang berisi data nama, dan NPM.
 * @returns Sebuah Promise yang mengembalikan `ServerResponseType`.
 * - Jika semua peserta tersedia: `{ success: true }`.
 * - Jika ada data yang tidak valid atau sudah terdaftar: `{ success: false, message: string }`
 * dengan pesan error yang spesifik.
 * - Jika terjadi kesalahan server: `{ success: false, message: "Terjadi kesalahan pada server." }`.
 */
"use server";

import { db } from "@/db/drizzle";
import { pesertaWebDesignTable } from "@/db/schemas/web-design-schema";
import { ServerResponseType } from "@/types/server-response-type";
import { isNumeric } from "@/utils/home/is-numeric";
import { FormPendaftaranPesertaSchemaType } from "@/zod/home/web-design/form-pendaftaran-tim-schema";
import { eq } from "drizzle-orm";

export async function cekKetersediaanPemain(
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

                        const cekNpmRes =
                                await db.query.pesertaWebDesignTable.findFirst({
                                        where: eq(
                                                pesertaWebDesignTable.npm,
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
