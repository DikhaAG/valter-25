"use server";

import { db } from "@/lib/drizzle";
import { pesertaEsportTable } from "@/server/db/schemas/esport-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function idMlCheck(
    id: string
): Promise<ServerResponseType<unknown>> {
    try {
        const res = await db.query.pesertaEsportTable.findFirst({
            where: eq(pesertaEsportTable.idML, id),
        });
        if (res) {
            return {
                success: false,
                message: `ID ${id} telah terdaftar.`,
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
