import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { customSessionClient } from "better-auth/client/plugins";
import { auth } from "./auth";
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!, // The base URL of your auth server
    plugins: [
        adminClient(),
        customSessionClient<typeof auth>()
    ]
})
