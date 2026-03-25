"use client";

import React from "react";
import { cn } from "@/shared/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";

interface Props {
	items: Category[];
	className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
	const { activeId } = useCategoryStore();

	return (
		<div
			className={cn(
				"inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
				className,
			)}
		>
			{items.map(({ id, name }) => (
				<a
					key={id}
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl px-5",
						activeId === id &&
							"bg-white shadow-md shadow-gray-200 text-primary",
					)}
					href={`/#${name}`}
				>
					<button className="cursor-pointer">{name}</button>
				</a>
			))}
		</div>
	);
};
