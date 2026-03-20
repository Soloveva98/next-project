"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ProductWithRelations } from "@/shared/types/type";
import { ProductForm } from "../product-form";

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					"p-0 w-[1060px] min-h-[500px] max-h-[90vh] !max-w-[1060px] bg-white no-scrollbar overflow-y-auto",
					className,
				)}
			>
				<VisuallyHidden>
					<DialogTitle>{product.name}</DialogTitle>
				</VisuallyHidden>

				<ProductForm
					product={product}
					onSuccess={() => router.back()}
				/>
			</DialogContent>
		</Dialog>
	);
};
