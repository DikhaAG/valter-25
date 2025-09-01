import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./drizzle";
import { esportRelations } from "@/server/db/relations/esport-relation";
import { videoCampaignRelation } from "@/server/db/relations/video-campaign-relation";
import { webDesignRelations } from "@/server/db/relations/web-design-relation";
import { enumSchema } from "@/server/db/schemas/enum-schema";
import { esportSchema } from "@/server/db/schemas/esport-schema";
import { videoCampaignSchema } from "@/server/db/schemas/video-campaign-schema";
import { webDesignSchema } from "@/server/db/schemas/web-design-schema";
import { seminarSchema } from "@/server/db/schemas/seminar-schema";
import { kelasSchema } from "@/server/db/schemas/kelas";
import { kelasRelations } from "@/server/db/relations/kelas-relation";
import { seminarRelations } from "@/server/db/relations/seminar-relation";
import { pelatihanSchema } from "@/server/db/schemas/pelatihan";
import { pelatihanRelation } from "@/server/db/relations/pelatihan";
import { authSchema } from "@/server/db/schemas/auth-schema";
import { historySchema } from "@/server/db/schemas/history";
import { admin } from "better-auth/plugins/admin";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { getUserDivisi, getUserRole } from "@/server/services/admin/queries/user";

export const auth = betterAuth({
    baseURL: "https://www.valter2025.com",
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            ...esportSchema,
            ...esportRelations,
            ...webDesignSchema,
            ...webDesignRelations,
            ...videoCampaignSchema,
            ...videoCampaignRelation,
            ...seminarSchema,
            ...seminarRelations,
            ...pelatihanSchema,
            ...pelatihanRelation,
            ...kelasSchema,
            ...kelasRelations,
            ...enumSchema,
            ...authSchema,
            ...historySchema
        },
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
    },
    plugins: [
        customSession(async ({ user, session }) => {
            const getUser = await getUserDivisi(user.id)
            const getRole = await getUserRole(user.id)
            const role = getRole.data!
            const divisi = getUser.data!

            return {
                user: {
                    ...user,
                    role,
                    divisi
                },
                session
            };
        }),
        admin(),

        nextCookies() // make sure this is the last plugin in the array
    ],
});
