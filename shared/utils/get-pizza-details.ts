import { Ingredient, ProductVariant } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
	size: PizzaSize,
	type: PizzaType,
	variants: ProductVariant[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
) => {
	const textDetails = `${size} см, ${mapPizzaType[type].toLowerCase()} тесто`;
	const totalPrice = calcTotalPizzaPrice(
		variants,
		ingredients,
		selectedIngredients,
		size,
		type,
	);

	return { textDetails, totalPrice };
};
