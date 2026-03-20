"use client";

import { cn } from "@/shared/utils";
import {
	Title,
	CheckboxFiltersGroup,
	RangeSlider,
	Input,
} from "@/components/index";
import { useIngredients, useFilters, useQueryFilters } from "@/shared/hooks";

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredients, loading } = useIngredients();
	const filters = useFilters();

	useQueryFilters(filters);

	const items = ingredients.map(({ id, name }) => ({
		value: String(id),
		text: name,
	}));

	const updatePrices = (prices: number[]) => {
		filters.setPrices("priceFrom", prices[0]);
		filters.setPrices("priceTo", prices[1]);
	};

	return (
		<div className={cn("", className)}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			{/* Фильтр типов теста */}
			<CheckboxFiltersGroup
				title="Тип теста"
				name="pizzaTypes"
				className="mb-5"
				selectedValues={filters.pizzaTypes}
				items={[
					{ text: "Традиционное", value: "1" },
					{ text: "Тонкое", value: "2" },
				]}
				onClickCheckbox={filters.setPizzaTypes}
			/>

			{/* Фильтр размеров */}
			<CheckboxFiltersGroup
				title="Размеры"
				name="sizes"
				className="mb-5 border-t border-y-neutral-100 pt-6"
				selectedValues={filters.sizes}
				items={[
					{ text: "20 см", value: "20" },
					{ text: "30 см", value: "30" },
					{ text: "40 см", value: "40" },
				]}
				onClickCheckbox={filters.setSizes}
			/>

			{/* Фильтр цен */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={5000}
						value={String(filters.prices.priceFrom)}
						onChange={(e) =>
							filters.setPrices(
								"priceFrom",
								Number(e.target.value),
							)
						}
					/>
					<Input
						type="number"
						placeholder="5000"
						min={100}
						max={5000}
						value={String(filters.prices.priceTo)}
						onChange={(e) =>
							filters.setPrices("priceTo", Number(e.target.value))
						}
					/>
				</div>

				<RangeSlider
					min={0}
					max={5000}
					step={10}
					value={[
						filters.prices.priceFrom || 0,
						filters.prices.priceTo || 5000,
					]}
					onValueChange={updatePrices}
				/>
			</div>

			{/* Фильтр ингридиентов */}
			<CheckboxFiltersGroup
				name="ingredients"
				title="Ингредиенты"
				className="mt-5"
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setSelectedIngredients}
				selectedValues={filters.selectedIngredients}
			/>
		</div>
	);
};
