"use server";

import { db } from "@/db/drizzle";
import { timML } from "@/db/schema";
import { emotError, emotSuccess } from "@/emot-response";
import { ServerResponseType } from "@/types/serverResponseType";
import { TimMLDisplaySchema } from "@/zod/tables/timML-display";
import { eq } from "drizzle-orm";

export async function timMLQueryById(
        id: string
): Promise<ServerResponseType<TimMLDisplaySchema>> {
        try {
                const res = await db.query.timML.findFirst({
                        with: { pesertaMLs: true },
                        where: eq(timML.id, id),
                });
                if (!res) {
                        return {
                                success: false,
                                message: `Data tim tidak ditemukan ${emotError}`,
                        };
                }
                return {
                        success: true,
                        message: `Berhasil mengambil data tim. ${emotSuccess}`,
                        data: res,
                };
        } catch (error) {
                return {
                        success: false,
                        message: `Terjadi kesalahan dalam mengambil data tim ${emotError}`,
                        error,
                };
        }
}
