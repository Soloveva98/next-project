import {
	Container,
	TopBar,
	Filters,
	ProductsGroupList,
	Stories,
	Footer,
} from "@/components/index";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/utils/find-pizzas";

export default async function Home({
	searchParams,
}: {
	searchParams: GetSearchParams;
}) {
	const categories = await findPizzas(searchParams);

	return (
		<div>
			<TopBar
				categories={categories.filter(
					(category) => category.products.length > 0,
				)}
			/>

			<Stories className="px-3" />

			<Container className="mt-10 pb-14 px-3">
				<div className="flex gap-[80px]">
					{/* Фильтрация */}
					<div className="w-[250px]">
						<Suspense>
							<Filters />
						</Suspense>
					</div>

					{/* Список товаров */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											categoryId={category.id}
											products={category.products}
										/>
									),
							)}
						</div>
					</div>
				</div>
			</Container>

			<Footer className="mt-10" />
		</div>
	);
}
