import { cn, getCartItemDetails } from "@/shared/utils";
import React from "react";
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from "..";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";

interface Props {
	className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ className }) => {
	const { items, loading, updateItemQuantity, removeCartItem } = useCart();

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus",
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<WhiteBlock title="1. Корзина" className={cn(className)}>
			<div className="flex flex-col gap-5">
				{loading
					? [...Array(5)].map((_, index) => (
							<CheckoutItemSkeleton key={index} />
						))
					: items.map((item) => (
							<CheckoutItem
								key={item.id}
								id={item.id}
								name={item.name}
								imageUrl={item.imageUrl}
								price={item.price}
								details={getCartItemDetails(
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize,
									item.ingredients,
								)}
								quantity={item.quantity}
								disabled={item.disabled}
								onClickCountButton={(type) =>
									onClickCountButton(
										item.id,
										item.quantity,
										type,
									)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
						))}
			</div>
		</WhiteBlock>
	);
};
