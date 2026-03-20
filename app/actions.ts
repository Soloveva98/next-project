"use server";

import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/utils";

import { cookies } from "next/headers";
import {
	PayOrderTemplate,
	VerificationUserTemplate,
} from "@/shared/components/shared/email-templates";
import { render } from "@react-email/render";

import { getUserSession } from "@/shared/utils/get-user-session";
import { hashSync } from "bcrypt";
import { Prisma } from "@prisma/client";
import { OrderStatus } from "@prisma/client";

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = await cookies();
		const cartToken = cookieStore.get("cartToken")?.value;

		if (!cartToken) {
			throw new Error("Cart token not found");
		}

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		});

		/* Если корзина не найдена, возращаем ошибку */
		if (!userCart) {
			throw new Error("Cart not found");
		}

		/* Если корзина пустая, возращаем ошибку */
		if (userCart?.totalAmount === 0) {
			throw new Error("Cart is empty");
		}

		/* Создаем заказ */
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + " " + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});

		/* Очищаем корзину */
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: "Оплата заказа #" + order.id,
		});

		if (!paymentData) {
			throw new Error("Payment data not found");
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;

		const emailHtml = await render(
			React.createElement(PayOrderTemplate, {
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl,
			}),
		);

		await sendEmail(
			data.email,
			"Next Pizza / Оплатите заказ #" + order.id,
			emailHtml,
		);

		return paymentUrl;
	} catch (error) {
		console.log("[CreateOrder] Server error: ", error);
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error("Пользователь не найден");
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		});

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password
					? hashSync(body.password as string, 10)
					: findUser?.password,
			},
		});
	} catch (err) {
		console.log("Error [UPDATE_USER]", err);
		throw err;
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error("Почта не подтверждена");
			}

			throw new Error("Пользователь уже существует");
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		});

		const emailHtml = await render(
			React.createElement(VerificationUserTemplate, {
				code,
			}),
		);

		await sendEmail(
			createdUser.email,
			"Next Pizza / 📝 Подтверждение регистрации",
			emailHtml,
		);
	} catch (err) {
		console.log("Error [CREATE_USER]", err);
		throw err;
	}
}
