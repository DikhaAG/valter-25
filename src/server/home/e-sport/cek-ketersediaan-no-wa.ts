"use server";

import { db } from "@/db/drizzle";
import { timML } from "@/db/schema";
import { ServerResponseType } from "@/types/serverResponseType";
import { eq } from "drizzle-orm";

export async function cekKetersediaanNoWa(
        noWa: string
): Promise<ServerResponseType<unknown>> {
        try {
                const res = await db.query.timML.findFirst({
                        where: eq(timML.noWa, noWa),
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
