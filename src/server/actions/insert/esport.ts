import { db } from "@/lib/drizzle";
import { timEsportTable } from "@/server/db/schemas/esport-schema";
import { ServerResponseType } from "@/types/server-response";
import { InferInsertModel } from "drizzle-orm";

type EsportTeam = InferInsertModel<typeof timEsportTable>
export async function insertEsportTeam(data: EsportTeam): Promise<ServerResponseType<string>> {
    try {
        const res = await db.insert(timEsportTable).values(data).returning({ insertedId: timEsportTable.id })
        return {
            success: true, data: res[0].insertedId
        }
    } catch (error) {
        return {
            success: false,
            message: "Terjadi kesalahan dalam menginsert data tim esport",
            error: error
        }
    }

}
