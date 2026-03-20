import {
	Ingredient,
	Product,
	ProductVariant,
} from "@prisma/client";

export type BaseResponse = {
	[key: string]: any;
	message: string;
	error?: unknown;
};

export interface PriceRange {
	priceFrom?: number;
	priceTo?: number;
}

export interface QueryFilters extends PriceRange {
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
}

export interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceRange;
}

export type ProductWithRelations = Product & {
	ingredients: Ingredient[];
	variants: ProductVariant[];
};

export type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
};
