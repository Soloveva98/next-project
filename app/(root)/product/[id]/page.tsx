import { Container, ProductForm } from "@/components/index";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
	const { id } = await params;
	const product = await prisma.product.findUnique({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							variants: true,
						},
					},
				},
			},
			variants: {
				orderBy: {
					createdAt: "desc",
				},
			},
		},
	});

	if (!product) {
		return notFound();
	}

	return (
		<Container className="flex flex-col my-10">
			<ProductForm product={product} />
		</Container>
	);
}
