"use client";

import { cn } from "@/shared/utils";
import { Variant } from "@/shared/types/type";
import React from "react";

interface Props {
	items: readonly Variant[];
	onClick?: (value: Variant["value"]) => void;
	value?: string;
	className?: string;
}

export const GroupVariants: React.FC<Props> = ({
	items,
	onClick,
	value,
	className,
}) => {
	return (
		<div
			className={cn(
				className,
				"flex justify-between bg-[#f3f3f7] rounded-3xl p-1 select-none",
			)}
		>
			{items.map((item) => (
				<button
					key={item.name}
					onClick={() => onClick?.(item.value)}
					className={cn(
						className,
						"flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
						{
							"bg-white shadow": item.value === value,
							"text-gray-500 opacity-50 pointer-events-none":
								item.disabled,
						},
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	);
};
