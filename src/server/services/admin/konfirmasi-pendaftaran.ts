"use server"
import { db } from "@/lib/drizzle";
import { pendaftaranSeminarKelasTable, pesertaSeminarTable } from "@/server/db/schemas/seminar-schema";
import { ServerResponseType } from "@/types/server-response";
import { getCurrentPostgresTimestamp } from "@/utils/get-current-postgres-timestamp";
import { eq } from "drizzle-orm";

export async function konfirmasiPendaftaranKelasSeminar(idKelas: string): Promise<ServerResponseType<unknown>> {
    try {
        const updateKelas = await db.update(pendaftaranSeminarKelasTable).set({ statusPembayaran: true, tanggalKonfirmasi: getCurrentPostgresTimestamp() }).where(eq(pendaftaranSeminarKelasTable.id, idKelas))

        if (updateKelas.rowCount === 0) {
            return {
                success: false, message: "Gagal mengupdate pendaftaran kelas."
            }
        }
        const getKelas = await db.query.pendaftaranSeminarKelasTable.findFirst({ with: { peserta: true }, where: eq(pendaftaranSeminarKelasTable.id, idKelas) })

        getKelas!.peserta.forEach(async (mhs) => {
            await db.update(pesertaSeminarTable).set({statusPembayaran: true, tanggalKonfirmasi: getCurrentPostgresTimestamp()}).where(eq(pesertaSeminarTable.id, mhs.id))
        })

        return {
            success: true
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }
}

export async function konfirmasiPendaftaranPesertaSeminar(id: string): Promise<ServerResponseType<unknown>> {
    try {
        const updateRes = await db.update(pesertaSeminarTable).set({ statusPembayaran: true, tanggalKonfirmasi: getCurrentPostgresTimestamp() }).where(eq(pesertaSeminarTable.id, id))

        if (updateRes.rowCount === 0) {
            return {
                success: false, message: "Gagal mengupdate pendaftaran peserta."
            }
        }

        return {
            success: true
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }
}
