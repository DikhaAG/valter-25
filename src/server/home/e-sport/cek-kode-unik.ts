"use server";

import { db } from "@/db/drizzle";
import { timML } from "@/db/schema";
import { ServerResponseType } from "@/types/serverResponseType";
import { eq } from "drizzle-orm";

export async function cekKodeUnik(kode: string): Promise<ServerResponseType<unknown>> {
        try {
                const res = await db.query.timML.findFirst({
                        where: eq(timML.id, kode),
                });
                if (!res) {
                        return {
                                success: false,
                                message: "Kode tidak ditemukan",
                        };
                }
                return {
                        success: true,
                };
        } catch (error) {
          console.log(error)
                return {
                        success: false,
                        message: "Terjadi kesalahan dalam mengecek kode unik.",
                        error: error,
                };
        }
}
