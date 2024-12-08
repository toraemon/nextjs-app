import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function PUT(request, context) {
    const reqBody = await request.json()
    try {
        const params = await context
        await connectDB()
        const singleItem = await ItemModel.findById(params.id)
        if (singleItem.email === reqBody.email) {
         await ItemModel.updateOne({ _id: params.id }, reqBody)
         return NextResponse.json({ message: "アイテム編集成功" })
        } else {
         return NextResponse.json({ message: "他の人が作成したアイテムです" })
        }
     } catch {
        return NextResponse.json({ message: "アイテム編集失敗" })
     }
}