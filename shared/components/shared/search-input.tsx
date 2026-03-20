"use client";

import React, { useRef, useState } from "react";
import { Product } from "@prisma/client";
import { cn } from "@/shared/utils";
import { Api } from "@/shared/services/api-client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useClickAway, useDebounce } from "react-use";

interface Props {
	className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [products, setProducts] = useState<Product[]>([]);
	const [focused, setFocused] = useState(false);
	const searchBlockRef = useRef<HTMLDivElement | null>(null);

	useClickAway(searchBlockRef, () => {
		setFocused(false);
	});

	useDebounce(
		async () => {
			try {
				const response = await Api.products.search(searchQuery);
				setProducts(response);
			} catch (error) {
				console.log(error);
			}
		},
		250,
		[searchQuery],
	);

	const onClickItem = () => {
		setSearchQuery("");
		setFocused(false);
		setProducts([]);
	};

	return (
		<>
			{focused && (
				<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
			)}
			<div
				className={cn(
					"flex rounded-2xl flex-1 justify-between relative h-11 z-30",
					className,
				)}
				ref={searchBlockRef}
			>
				<Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
				<input
					className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
					type="text"
					placeholder="Найти пиццу..."
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && (
					<div
						className={cn(
							"absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
							focused && "visible opacity-100 top-12",
						)}
					>
						{products.map(({ id, name, imageUrl }) => (
							<Link
								key={id}
								className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
								href={`/product/${id}`}
								onClick={onClickItem}
							>
								<img
									className="rounded-sm h-8 w-8"
									src={imageUrl}
									alt={name}
								/>
								<span>{name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};
