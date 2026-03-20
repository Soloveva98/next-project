import { ChooseProductModal } from "@/components/index";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function ProductModalPage({ params }: Props) {
	const { id } = await params;
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			variants: true,
		},
	});

	if (!product) {
		return notFound();
	}

	return <ChooseProductModal product={product} />;
}
