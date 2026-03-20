import { ProductVariant } from "@prisma/client";
import { pizzaSizes } from "../constants/pizza";
import { Variant } from "../types/type";

export const getAvailablePizzaSizes = (
	variants: ProductVariant[],
	type: number,
): Variant[]  => {
	const filteredPizzasByType = variants?.filter(
		(item) => item.pizzaType === type,
	);

	return pizzaSizes.map((pizzaSize) => ({
		name: pizzaSize.name,
		value: pizzaSize.value,
		disabled: !filteredPizzasByType?.some(
			(pizza) => Number(pizza.size) === Number(pizzaSize.value),
		),
	}));
};
