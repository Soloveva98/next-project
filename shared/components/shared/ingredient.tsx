import { cn } from "@/shared/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
	imageUrl: string;
	name: string;
	price: number;
	active?: boolean;
	onClick?: () => void;
	className?: string;
}

export const Ingredient: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	active,
	onClick,
	className,
}) => {
	return (
		<div
			className={cn(
				className,
				"flex items-center flex-col p-1 rounded-md w-32 tetxt-center relative cursor-pointer shadow-md bg-white",
				{ "border border-primary": active },
			)}
			onClick={onClick}
		>
			{active && (
				<CircleCheck className="absolute top-2 right-2 text-primary" />
			)}
			<img width={110} height={110} src={imageUrl} />
			<span className="text-xs mb-1 text-center">{name}</span>
			<span className="font-bold">{price} ₽</span>
		</div>
	);
};
