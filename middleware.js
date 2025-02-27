import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        console.log("No token found. Redirecting to /");
        return NextResponse.redirect(new URL("/", req.url));
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
        const userRole = payload.role;

        const generalRoutes = ["/chat", "/quote"];
        const adminRoutes = ["/admin-dashboard", "/chat", "/quote"];

        const currentPath = req.nextUrl.pathname;

        if (userRole === "general") {
            if (generalRoutes.includes(currentPath)) {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(new URL("/sign-in", req.url));
            }
        }

        if (userRole === "admin") {
            if (adminRoutes.includes(currentPath)) {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(new URL("/sign-in", req.url));
            }
        }

        return NextResponse.redirect(new URL("/sign-in", req.url));

    } catch (error) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }
}

export const config = {
    matcher: ["/chat", "/quote", "/admin-dashboard"],
};