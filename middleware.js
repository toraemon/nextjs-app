import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwIjoxNzMzNzkwMjYzfQ.x4pvfiC2Hw6lhtCm6WMvDk4X7t-xKUM7dxVAOsdZdCg"
    // const token = await request.headers.get("Authorization")?.split(" ")[1]
    if (!token) {
        return NextResponse.json({ message: "トークンがありません" })
    }

    try {
        const secretKey = new TextEncoder().encode("next-market-app-book")
        await jwtVerify(token, secretKey)
        return NextResponse.next()
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({ message: "トークンが正しくないので、ログインしてください" })
    }
}

export const config = {
    matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}