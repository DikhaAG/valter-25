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
    if (!session) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    if (
        request.nextUrl.pathname.startsWith("/admin") &&
        session.user.role !== "admin"
    ) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    console.log("=========================")
    if (request.nextUrl.pathname.startsWith("/auth")) {

        const referer = request.headers.get('referer');

        if (session.user.role === "admin") {
            const previousUrl = referer ? new URL(referer).pathname : '/admin';

            return NextResponse.redirect(new URL(previousUrl, request.url));
        }

        const previousUrl = referer ? new URL(referer).pathname : '/';
        return NextResponse.redirect(new URL(previousUrl, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin", "/auth/signin", "/auth/register"
    ], // Specify the routes the middleware applies to
};
