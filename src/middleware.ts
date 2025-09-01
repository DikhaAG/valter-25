// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";

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
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    try {
        const url = `https://valter2025.com`;

        // const response = await fetch(url, {
        //     headers: {
        //         cookie: request.headers.get("cookie") || "",
        //     },
        // });
        //
        // // Periksa apakah respons berhasil. Jika tidak, redirect.
        // if (!response.ok) {
        //     console.error("Failed to fetch session:", response.status);
        //     return NextResponse.redirect(new URL("/", request.url));
        // }
        //
        // // Baca respons sebagai JSON. Tambahkan pengecekan null sebelum destructuring.
        // const responseData = await response.json();
        //
        // // Periksa apakah responseData adalah objek yang valid dan memiliki properti 'data'
        // const session: Session | null = responseData?.data ?? null;

        const { data: session } = await betterFetch<Session>(
            "/api/auth/get-session",
            {
                baseURL: url,
                headers: {
                    cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
                },
            }
        );
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
        return NextResponse.redirect(new URL("/error", request.url));
    }
}

export const config = {
    matcher: "/admin:path*",
};
