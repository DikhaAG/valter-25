"use server"
import { db } from "@/lib/drizzle";
import { timEsportTable } from "@/server/db/schemas/esport-schema";
import { pesertaPelatihanTable } from "@/server/db/schemas/pelatihan";
import { pesertaSeminarTable } from "@/server/db/schemas/seminar-schema";
import { timVideoCampaignTable } from "@/server/db/schemas/video-campaign-schema";
import { timWebDesignTable } from "@/server/db/schemas/web-design-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq, isNotNull, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTotalTimEsportTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timEsportTable.findMany({ where: eq(timEsportTable.statusPembayaran, true) })
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalTimEsportBelumTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timEsportTable.findMany({ where: eq(timEsportTable.statusPembayaran, false) })
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalTimEsport(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timEsportTable.findMany()
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
//============================================================
export async function getTotalTimWebDesignTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timWebDesignTable.findMany({ where: eq(timWebDesignTable.statusPembayaran, true) })
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalTimWebDesignBelumTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timWebDesignTable.findMany({ where: eq(timWebDesignTable.statusPembayaran, false) })
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalTimWebDesign(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timWebDesignTable.findMany()
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
//============================================================
export async function getTotalTimVideoCampaignTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timVideoCampaignTable.findMany({ where: eq(timVideoCampaignTable.statusPembayaran, true) })
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalTimVideoCampaignBelumTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timVideoCampaignTable.findMany({ where: eq(timVideoCampaignTable.statusPembayaran, false) })
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalTimVideoCampaign(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timVideoCampaignTable.findMany()
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
//============================================================
export async function getTotalPesertaSeminarTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaSeminarTable.findMany({ where: eq(pesertaSeminarTable.statusPembayaran, true) })

        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalPesertaSeminarBelumTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaSeminarTable.findMany({ where: eq(pesertaSeminarTable.statusPembayaran, false) })

        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalPesertaSeminarIndividu(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaSeminarTable.findMany({where: isNull(pesertaSeminarTable.kelas)})
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalPesertaSeminarKelas(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaSeminarTable.findMany({where: isNotNull(pesertaSeminarTable.kelas)})
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalPesertaSeminar(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaSeminarTable.findMany()
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalPendaftaranKelasSeminar(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pendaftaranSeminarKelasTable.findMany()
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
//============================================================
export async function getTotalPesertaPelatihanTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaPelatihanTable.findMany({ where: eq(pesertaPelatihanTable.statusPembayaran, true) })
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalPesertaPelatihanBelumTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaPelatihanTable.findMany({ where: eq(pesertaPelatihanTable.statusPembayaran, false) })
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalPesertaPelatihanIndividu(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaPelatihanTable.findMany({where: isNull(pesertaPelatihanTable.kelas)})
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalPesertaPelatihanKelas(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaPelatihanTable.findMany({where: isNotNull(pesertaPelatihanTable.kelas)})
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalPesertaPelatihan(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaPelatihanTable.findMany()
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalPendaftaranKelasPelatihan(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pendaftaranPelatihanKelasTable.findMany()
        return {
            success: true, data: res.length
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
//============================================================
export async function getTotalSemuaPendaftarTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        let count = 0
        const total = [
            await getTotalTimEsportTerkonfirmasi(),
            await getTotalTimWebDesignTerkonfirmasi(),
            await getTotalTimVideoCampaignTerkonfirmasi(),
            await getTotalPesertaSeminarTerkonfirmasi(),
            await getTotalPesertaPelatihanTerkonfirmasi()
        ]
        total.map(t => count += t.data ?? 0)
        return {
            success: true, data: count
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalSemuaPendaftarBelumTerkonfirmasi(): Promise<ServerResponseType<number>> {
    try {
        let count = 0
        const total = [
            await getTotalTimEsportBelumTerkonfirmasi(),
            await getTotalTimWebDesignBelumTerkonfirmasi(),
            await getTotalTimVideoCampaignBelumTerkonfirmasi(),
            await getTotalPesertaSeminarBelumTerkonfirmasi(),
            await getTotalPesertaPelatihanBelumTerkonfirmasi()
        ]
        total.map(t => count += t.data ?? 0)
        return {
            success: true, data: count
        }
    } catch (e) {
        return {
            success: false,
            message: `${e}`
        }
    }
}
export async function getTotalSemuaPendaftar(): Promise<ServerResponseType<number>> {
    try {
        let count = 0
        const total = [await getTotalSemuaPendaftarTerkonfirmasi(), await getTotalSemuaPendaftarBelumTerkonfirmasi()]
        total.map(t => count += t.data ?? 0)
        return {
            success: true, data: count
        }
    } catch (e) {
        return {
            success: false, message: `{e}`
        }
    }
}
