"use client";

import React from "react";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { ProductWithRelations } from "@/shared/types/type";
import { ChoosePizzaForm, ChooseProductForm } from "@/components/index";

interface Props {
	product: ProductWithRelations;
	onSuccess?: VoidFunction;
	className?: string;
}

export const ProductForm: React.FC<Props> = ({ product, onSuccess, className }) => {
	const { loading, addCartItem } = useCartStore();
	const firstItem = product.variants[0];
	const isPizzaForm = Boolean(firstItem.pizzaType);

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id;

			await addCartItem({ productItemId: itemId, ingredients });

			toast.success(product.name + " добавлена в корзину");

			onSuccess?.();
		} catch (error) {
			toast.error("Не удалось добавить товар в корзину");
			console.error(error);
		}
	};

	return isPizzaForm ? (
		<ChoosePizzaForm
			name={product.name}
			imageUrl={product.imageUrl}
			ingredients={product.ingredients}
			variants={product.variants}
			loading={loading}
			onSubmit={onSubmit}
		/>
	) : (
		<ChooseProductForm
			name={product.name}
			imageUrl={product.imageUrl}
			price={firstItem.price}
			loading={loading}
			onSubmit={onSubmit}
		/>
	);
};
