import { prisma } from "@/prisma/prisma-client";
export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 5000;

export const findPizzas = async (params: GetSearchParams) => {
	const {
		sizes,
		pizzaTypes,
		ingredients,
		priceFrom,
		priceTo,
		query,
		sortBy,
	} = await params;
	const sizesArr = sizes?.split(",").map(Number);
	const typesArr = pizzaTypes?.split(",").map(Number);
	const ingredientsIdArr = ingredients?.split(",").map(Number);

	const minPrice = Number(priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(priceTo) || DEFAULT_MAX_PRICE;

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: "desc",
				},
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
							}
						: undefined,
					variants: {
						some: {
							size: {
								in: sizesArr,
							},
							pizzaType: {
								in: typesArr,
							},
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
					},
				},
				include: {
					variants: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: "asc",
						},
					},
					ingredients: true,
				},
			},
		},
	});

	return categories;
};
