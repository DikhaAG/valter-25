"use server";

import { db } from "@/db/drizzle";
import { pesertaML } from "@/db/schema";
import { ServerResponseType } from "@/types/serverResponseType";
import { isNumeric } from "@/utils/isNumeric";
import { RegistrasiPesertaSchema } from "@/zod/home/e-sport/registrasi-form-schema";
import { eq } from "drizzle-orm";

export async function cekKetersediaanPemain(
        peserta: RegistrasiPesertaSchema[]
): Promise<ServerResponseType<unknown>> {
        peserta.forEach(async (p) => {
                try {
                        if (!isNumeric(p.npm)) {
                                return {
                                        success: false,
                                        message: `NPM hanya boleh mengandung angka.`,
                                };
                        }
                        const cekIdMLRes = await db.query.pesertaML.findFirst({
                                where: eq(pesertaML.idML, p.idML),
                        });
                        if (cekIdMLRes) {
                                return {
                                        success: false,
                                        message: `ID ML ${p.idML} tim telah dipakai.`,
                                };
                        }

                        const cekNpmRes = await db.query.pesertaML.findFirst({
                                where: eq(pesertaML.npm, p.npm!),
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
        });
        return {
                success: true,
        };
}
