import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { requestToBodyStream } from "next/dist/server/body-streams";
import { NextResponse } from "next/server";

export async function POST(request) {
    const reqBody = await request.json()
    try {
        await connectDB()
        await UserModel.create(reqBody)
        return NextResponse.json({ message: "ユーザー登録成功" })
    } catch {
        return NextResponse.json({ message: "ユーザー登録失敗" })
    }
}