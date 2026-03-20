"use client";

import { cn, getPizzaDetails } from "@/shared/utils";
import React from "react";
import {
	Title,
	GroupVariants,
	PizzaImage,
	Ingredient as IngredientCard,
	Button,
} from "@/components/index";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import {
	Ingredient,
	ProductVariant,
} from "@prisma/client";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	variants: ProductVariant[];
	loading: boolean;
	onSubmit: (itemId: number, ingredients: number[]) => void;
	className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	name,
	ingredients,
	variants,
	loading,
	onSubmit,
	className,
}) => {
	const {
		size,
		type,
		selectedIngredients,
		availablePizzaSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(variants);

	const { textDetails, totalPrice } = getPizzaDetails(
		size,
		type,
		variants,
		ingredients,
		selectedIngredients,
	);

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className={cn(className, "flex flex-1")}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{textDetails}</p>

				<div className="flex flex-col gap-3 mt-5">
					<GroupVariants
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
						items={availablePizzaSizes}
					/>

					<GroupVariants
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
						items={pizzaTypes}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((ing) => (
							<IngredientCard
								key={ing.id}
								imageUrl={ing.imageUrl}
								name={ing.name}
								price={ing.price}
								active={selectedIngredients.has(ing.id)}
								onClick={() => addIngredient(ing.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					onClick={handleClickAdd}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
