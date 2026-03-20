"use client";

import React, { useEffect, useState } from "react";
import { Variant } from "../types/type";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../utils";
import { ProductVariant } from "@prisma/client";

interface ReturnProps {
	size: PizzaSize;
	type: PizzaType;
	selectedIngredients: Set<number>;
	availablePizzaSizes: Variant[];
	currentItemId?: number;
	setSize: (size: PizzaSize) => void;
	setType: (type: PizzaType) => void;
	addIngredient: (id: number) => void;
}

export const usePizzaOptions = (variants: ProductVariant[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([]),
	);
	const availablePizzaSizes = getAvailablePizzaSizes(variants, type);
	const currentItemId = variants.find(
		(item) => item.pizzaType === type && item.size === size,
	)?.id;

	useEffect(() => {
		const isAvailableSize = availablePizzaSizes?.find(
			(pizza) => Number(pizza.value) === size && !pizza.disabled,
		);
		const availableSize = availablePizzaSizes?.find(
			(pizza) => !pizza.disabled,
		);

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [type]);

	return {
		size,
		type,
		selectedIngredients,
		availablePizzaSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	};
};
