import { db } from "@/lib/drizzle"
import { timEsportTable } from "@/server/db/schemas/esport-schema"
import { pesertaPelatihanTable } from "@/server/db/schemas/pelatihan"
import { pesertaSeminarTable } from "@/server/db/schemas/seminar-schema"
import { timWebDesignTable } from "@/server/db/schemas/web-design-schema"
import { ServerResponseType } from "@/types/server-response"
import { eq } from "drizzle-orm"

export async function getEsportIncome(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timEsportTable.findMany({
            where: eq(timEsportTable.statusPembayaran, true)
        })
        const htm = 45000
        const income = res.length * htm
        return {
            success: true
            , data: income
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }

}

export async function getWebDesignIncome(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timWebDesignTable.findMany({
            where: eq(timWebDesignTable.statusPembayaran, true)
        })
        const htm = 35000
        const income = res.length * htm
        return {
            success: true
            , data: income
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }

}

export async function getVideoCampaignIncome(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timVideoCampaignTable.findMany({
            where: eq(timWebDesignTable.statusPembayaran, true)
        })
        const htm = 60000
        const income = res.length * htm
        return {
            success: true
            , data: income
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }

}

export async function getSeminarIncome(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaSeminarTable.findMany({
            where: eq(pesertaSeminarTable.statusPembayaran, true)
        })
        const htm = 60000
        const income = res.length * htm
        return {
            success: true
            , data: income
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }

}

export async function getPelatihanIncome(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.pesertaPelatihanTable.findMany({
            where: eq(pesertaPelatihanTable.statusPembayaran, true)
        })
        const htm = 75000
        const income = res.length * htm
        return {
            success: true
            , data: income
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }

}

export async function getAllIncome(): Promise<ServerResponseType<number>> {
    try {
        const incomes = [await getSeminarIncome(), await getPelatihanIncome(), await getEsportIncome(), await getWebDesignIncome(), await getVideoCampaignIncome()]
        let count = 0
        incomes.map(income => count += income.data ?? 0)
        return {
            success: true, data: count
        }
    } catch (e) {
        return {
            success: false, message: `${e}`
        }
    }

}
