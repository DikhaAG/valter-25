import { db } from "@/lib/drizzle";
import { timVideoCampaignTable } from "@/server/db/schemas/video-campaign-schema";
import { ServerResponseType } from "@/types/server-response";
import { InferInsertModel } from "drizzle-orm";

type VideoCampaignTeam = InferInsertModel<typeof timVideoCampaignTable>
export async function insertVideoCampaignTeam(data: VideoCampaignTeam): Promise<ServerResponseType<string>> {
    try {
        const res = await db.insert(timVideoCampaignTable).values(data).returning({ insertedId: timVideoCampaignTable.id })
        return {
            success: true, data: res[0].insertedId
        }
    } catch (error) {
        return {
            success: false,
            message: "Terjadi kesalahan dalam menginsert data tim ",
            error: error
        }
    }

}
