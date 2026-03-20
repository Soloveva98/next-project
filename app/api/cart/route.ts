import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/utils";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ items: [], totalAmount: 0 });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				token,
			},
			include: {
				items: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.log("[CART_GET] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось получить корзину" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get("cartToken")?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(token);
		const data = (await req.json()) as CreateCartItemValues;

		const possibleCartItems = await prisma.cartItem.findMany({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
			},
			include: {
				ingredients: true,
			},
		});

		const findCartItem = possibleCartItems.find((item) => {
			const itemIngredientIds = item.ingredients.map((i) => i.id).sort();
			const dataIngredientIds = (data.ingredients || []).sort();

			return (
				JSON.stringify(itemIngredientIds) ===
				JSON.stringify(dataIngredientIds)
			);
		});

		// Если товар был найден в корзине, то делаем +1
		if (findCartItem) {
			await prisma.cartItem.update({
				where: { id: findCartItem.id },
				data: { quantity: findCartItem.quantity + 1 },
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
					ingredients: {
						connect: data.ingredients?.map((id) => ({ id })),
					},
				},
			});
		}

		const updatedUserCart = await updateCartTotalAmount(token);
		const resp = NextResponse.json(updatedUserCart);
		resp.cookies.set("cartToken", token);

		return resp;
	} catch (error) {
		console.log("[CART_POST] Server error", error);

		return NextResponse.json(
			{ message: "Не удалось добавить товар в корзину" },
			{ status: 500 },
		);
	}
}
