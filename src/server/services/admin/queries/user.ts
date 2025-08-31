"use server"
import { db } from "@/lib/drizzle";
import { user } from "@/server/db/schemas/auth-schema";
import { DivisiEnum,  } from "@/server/db/schemas/enum-schema";
import { ServerResponseType } from "@/types/server-response";
import { eq,  } from "drizzle-orm";

export async function getUserDivisi(id:string): Promise<ServerResponseType<DivisiEnum>> {
    try {
        const res = await db.selectDistinct({divisi: user.divisi}).from(user).where(eq(user.id, id))
        return {
            success: true, data: res[0].divisi!
        }
    } catch (e) {
        return {success: false, message: `${e}`}
    }
}

export async function getUserRole(id:string): Promise<ServerResponseType<string>> {
    try {
        const res = await db.selectDistinct({role: user.role}).from(user).where(eq(user.id, id))
        return {
            success: true, data: res[0].role!
        }
    } catch (e) {
        return {success: false, message: `${e}`}
    }
}
