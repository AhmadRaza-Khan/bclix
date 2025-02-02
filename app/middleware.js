import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;
    if (token) {
        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
            if (payload.role === "general") {
                return NextResponse.next();
            }
        } catch (error) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
    if (req.nextUrl.pathname.startsWith("/apiUpload")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/apiUpload/:path*"],
};
