import { Ingredient, ProductVariant } from "@prisma/client";

/**
 * Функция для подсчета общей стоимости пиццы
 * @param variants - список вариаций пиццы
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - список выбранных ингредиентов
 * @param size - размер выбранной пиццы
 * @param type - тип теста выбранной пиццы
 * @returns общую стоимость пиццы
 */

export const calcTotalPizzaPrice = (
	variants: ProductVariant[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
	size: number,
	type: number,
) => {
	const pizzaPrice =
		variants?.find((item) => item.pizzaType === type && item.size === size)
			?.price || 0;
	const totalIngredientsPrice = ingredients
		.filter((ing) => selectedIngredients.has(ing.id))
		.reduce((acc, ing) => acc + ing.price, 0);

	return pizzaPrice + totalIngredientsPrice;
};
