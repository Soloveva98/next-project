import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	const token = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
	});
	const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard");

	if (!token || (isAdminRoute && token.role !== "ADMIN")) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
