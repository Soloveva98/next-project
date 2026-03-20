"use client";

import { useEffect } from "react";
import { useCartStore } from "../store";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../utils/get-cart-details";

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[];
	loading: boolean;
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	addCartItem: (values: CreateCartItemValues) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
};

export const useCart = (): ReturnProps => {
	const cartState = useCartStore();

	useEffect(() => {
		cartState.fetchCartItems();
	}, []);

	return cartState;
};
