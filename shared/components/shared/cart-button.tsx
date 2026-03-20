"use client";

import React from "react";
import { Button } from "../ui";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { cn } from "@/shared/utils";
import { CartDrawer } from "@/components/index";
import { useCartStore } from "@/shared/store";

interface Props {
	className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
	const { loading, totalAmount, items } = useCartStore();
	const totalQuantity =
		items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

	return (
		<CartDrawer>
			<Button
				loading={loading}
				className={cn(className, "group relative", {
					"w-[105px]": loading,
				})}
			>
				<b>{totalAmount} p</b>
				<span className="h-full w-[1px] bg-white/30 mx-3" />
				<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
					<ShoppingCart
						className="relative"
						strokeWidth={2}
						size={16}
					/>
					<b>{totalQuantity}</b>
				</div>
				<ArrowRight
					className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
					size={20}
				/>
			</Button>
		</CartDrawer>
	);
};
