"use server"
import { db } from "@/lib/drizzle";
import { pendaftaranSeminarKelasTable, pesertaSeminarTable } from "@/server/db/schemas/seminar-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";

export async function hapusPendaftaranKelasSeminar(idKelas: string): Promise<ServerResponseType<unknown>> {
    try {
        await db.delete(pendaftaranSeminarKelasTable).where(eq(pendaftaranSeminarKelasTable.id, idKelas))
        return {
            success: true
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }
}

export async function hapusPesertaIndividuSeminar(id: string): Promise<ServerResponseType<unknown>> {
    try {
        await db.delete(pesertaSeminarTable).where(eq(pesertaSeminarTable.id, id))
        return {
            success: true
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }
}
