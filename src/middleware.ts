import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
            },
        }
    );

    console.log(`clg from middleware +++++++++++++++++++++++`)
    console.log(session)
    if (!session) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (session.user.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin:path*", 
    ], // Specify the routes the middleware applies to
};
