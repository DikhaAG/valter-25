"use server";

import { db } from "@/lib/drizzle";
import { pesertaSeminarTable } from "@/server/db/schemas/seminar-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function npmCheck(
    npm: string
): Promise<ServerResponseType<unknown>> {
    try {
        const res = await db.query.pesertaSeminarTable.findFirst({
            where: eq(pesertaSeminarTable.npm, npm),
        });
        if (res) {
            return {
                success: false,
                message: `NIM/NPM ${npm} telah terdaftar.`,
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
    return {
        success: true,
    };
}
