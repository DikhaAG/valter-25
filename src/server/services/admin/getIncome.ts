import { db } from "@/lib/drizzle"
import { ServerResponseType } from "@/types/server-response"
import { revalidatePath } from "next/cache"

export async function getEsportIncome(): Promise<ServerResponseType<number>> {
    try {
        const res = await db.query.timEsportTable.findMany({
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
