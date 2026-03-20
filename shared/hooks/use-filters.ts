"use client";

import React from "react";
import { Filters, PriceRange, QueryFilters } from "@/shared/types/type";
import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceRange, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>;

	// Фильтр ингредиентов
	const [selectedIngredients, { toggle: setSelectedIngredients }] = useSet(
		new Set<string>(searchParams.get("ingredients")?.split(",")),
	);

	// Фильтр размеров
	const [sizes, { toggle: setSizes }] = useSet(
		new Set<string>(
			searchParams.has("sizes")
				? searchParams.get("sizes")?.split(",")
				: [],
		),
	);

	// Фильтр типов
	const [pizzaTypes, { toggle: setPizzaTypes }] = useSet(
		new Set<string>(
			searchParams.has("pizzaTypes")
				? searchParams.get("pizzaTypes")?.split(",")
				: [],
		),
	);

	// Фильтр цен
	const [prices, setPrices] = React.useState<PriceRange>({
		priceFrom: Number(searchParams.get("priceFrom")) || undefined,
		priceTo: Number(searchParams.get("priceTo")) || undefined,
	});

	const updatePrice = (name: keyof PriceRange, value: number) => {
		setPrices((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return React.useMemo(
		() => ({
			sizes,
			pizzaTypes,
			selectedIngredients,
			prices,
			setPrices: updatePrice,
			setPizzaTypes,
			setSizes,
			setSelectedIngredients,
		}),
		[sizes, pizzaTypes, selectedIngredients, prices],
	);
};
