"use server"

import { db } from "@/lib/drizzle";
import { KelasTableSchema } from "@/models/kelas/table";
import { kelasTable } from "@/server/db/schemas/kelas";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";


export async function getKelasByName(name: string): Promise<ServerResponseType<KelasTableSchema>> {
    try {
        const res = await db.query.kelasTable.findFirst({
            where: eq(kelasTable.nama, name)
        })
        if (!res) {
            return {
                success: false, message: "data kelas tidak ditemukan!."
            }
        }
        return {
            success: true, data: res
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }
}
