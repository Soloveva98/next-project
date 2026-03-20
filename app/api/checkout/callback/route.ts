import React from "react";
import { OrderStatus } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";
import { sendEmail } from "@/shared/utils";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { PaymentCallbackData } from "@/shared/types/yookassa";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import { OrderErrorTemplate, OrderSuccessTemplate } from "@/shared/components";

export async function POST(req: NextRequest) {
	try {
		console.log("CHECKOUT CALLBACK");
		const body = (await req.json()) as PaymentCallbackData;

		const order = await prisma.order.findFirst({
			where: {
				id: Number(body.object.metadata.order_id),
			},
		});

		if (!order) {
			return NextResponse.json({ error: "Order not found" });
		}

		const isSucceeded = body.object.status === "succeeded";

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded
					? OrderStatus.SUCCEEDED
					: OrderStatus.CANCELLED,
			},
		});

		const items = JSON.parse(order?.items as string) as CartItemDTO[];

		if (isSucceeded) {
			const emailSuccessHtml = await render(
				React.createElement(OrderSuccessTemplate, {
					orderId: order.id,
					items,
				}),
			);

			await sendEmail(
				order.email,
				"Next Pizza / Ваш заказ успешно оформлен 🎉",
				emailSuccessHtml,
			);
		} else {
			const emailErrorHtml = await render(
				React.createElement(OrderErrorTemplate, {
					orderId: order.id,
				}),
			);

			await sendEmail(
				order.email,
				"Next Pizza / Не удалось оформить заказ ❌",
				emailErrorHtml,
			);
		}

		return NextResponse.json({});
	} catch (error) {
		console.log("[Checkout Callback] Error:", error);

		return NextResponse.json({ error: "Server error" }, { status: 200 });
	}
}
