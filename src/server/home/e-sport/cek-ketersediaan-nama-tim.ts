"use server";

import { db } from "@/db/drizzle";
import { timML } from "@/db/schema";
import { ServerResponseType } from "@/types/serverResponseType";
import { eq } from "drizzle-orm";

export async function cekKetersediaanNamaTim(
        namaTim: string
): Promise<ServerResponseType<unknown>> {
        try {
                const res = await db.query.timML.findFirst({
                        where: eq(timML.namaTim, namaTim),
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
                console.log("cekKetersediaanNamaTim")
                console.log(error)
                return {
                        success: false,
                        message: "Terjadi kesalahan pada server.",
                        error: error,
                        statusCode: 500
                };
        }
}
