// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import { betterFetch } from "@better-fetch/fetch";
//
// type Session = typeof auth.$Infer.Session;
//
// export async function middleware(request: NextRequest) {
//     const { data: session } = await betterFetch<Session>(
//         "/api/auth/get-session",
//         {
//             baseURL: request.nextUrl.origin,
//             headers: {
//                 cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
//             },
//         }
//     );
//
//     console.log(`clg from middleware +++++++++++++++++++++++`)
//     console.log(session)
//     if (!session) {
//         return NextResponse.redirect(new URL("/", request.url));
//     }
//
//     if (session.user.role !== "admin") {
//         return NextResponse.redirect(new URL("/", request.url));
//     }
//
//     return NextResponse.next();
// }
//
// export const config = {
//     matcher: [
//         "/admin:path*", 
//     ], // Specify the routes the middleware applies to
// };
//
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    try {
        const url = `https://valter2025.com/api/auth/get-session`;
        
        // Menggunakan fetch API bawaan dengan URL absolut
        const response = await fetch(url, {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        });

        if (!response.ok) {
            // Jika respons tidak berhasil (misalnya 401 Unauthorized)
            console.error("Failed to fetch session:", response.status);
            return NextResponse.redirect(new URL("/", request.url));
        }

        const { data: session }: { data: Session } = await response.json();

        console.log(`clg from middleware +++++++++++++++++++++++`);
        console.log(session);

        if (!session) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        if (session.user.role !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware fetch error:", error);
        // Tangani error fetch, misalnya, alihkan ke halaman error
        return NextResponse.redirect(new URL("/error", request.url));
    }
}

export const config = {
    matcher: "/admin:path*",
};
