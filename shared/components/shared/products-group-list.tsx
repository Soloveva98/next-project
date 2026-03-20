"use client";

import React, { useEffect, useRef } from "react";
import { Title } from "./title";
import { cn } from "@/shared/utils";
import { ProductCard } from "@/components/index";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelations } from "@/shared/types/type";

interface Props {
	title: string;
	products: ProductWithRelations[];
	categoryId: number;
	listClassName?: string;
	className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	products,
	categoryId,
	listClassName,
	className,
}) => {
	const intersectionRef = useRef<HTMLDivElement>(null);
	const intersection = useIntersection(
		intersectionRef as React.RefObject<HTMLDivElement>,
		{
			threshold: 0.6,
		},
	);
	const { activeId, setActiveId } = useCategoryStore();

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveId(categoryId);
		}
	}, [intersection?.isIntersecting]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />

			<div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
				{products.map((product, i) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.variants[0].price}
						ingredients={product.ingredients}
					/>
				))}
			</div>
		</div>
	);
};
