import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const users = await prisma.user.findMany();
	return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		const user = await prisma.user.create({ data });

		return NextResponse.json({
			user,
			message: "Пользователь успешно создан",
		});
	} catch (error) {
		return NextResponse.json({
			message: "Не удалось создать пользователя",
			error,
		});
	}
}
