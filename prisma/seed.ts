import { categories, _ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
	id,
	productId,
	pizzaType,
	size,
}: {
	id: number;
	productId: number;
	pizzaType?: 1 | 2;
	size?: 20 | 30 | 40;
}) => {
	return {
		id,
		productId,
		price: randomNumber(190, 600),
		pizzaType,
		size,
	};
};

async function up() {
	await prisma.user
		.createMany({
			data: [
				{
					fullName: "User Testtt",
					email: "user@test.ru",
					password: hashSync("111111", 10).toString(),
					verified: new Date(),
					role: "USER",
					id: 1,
				},
				{
					fullName: "Admin Test",
					email: "admin@test.ru",
					password: hashSync("111111", 10).toString(),
					verified: new Date(),
					role: "ADMIN",
					id: 2,
				},
			],
		})
		.then(() => {
			console.log("✅ Пользователи добавлены");
		});

	await prisma.category
		.createMany({
			data: categories,
		})
		.then(() => {
			console.log("✅ Категории добавлены");
		});

	await prisma.ingredient
		.createMany({
			data: _ingredients,
		})
		.then(() => {
			console.log("✅ Ингредиенты добавлены");
		});

	await prisma.product
		.createMany({
			data: products,
		})
		.then(() => {
			console.log("✅ Продукты добавлены");
		});

	const pizza1 = await prisma.product.create({
		data: {
			id: 17,
			name: "Пепперони фреш",
			imageUrl:
				"https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 5),
			},
		},
	});

	const pizza2 = await prisma.product.create({
		data: {
			id: 18,
			name: "Сырная",
			imageUrl:
				"https://media.dodostatic.net/image/r:292x292/0198bf40eb1171aabe90b1b3ce07c0c5.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(5, 10),
			},
		},
	});

	const pizza3 = await prisma.product.create({
		data: {
			id: 19,
			name: "Чоризо фреш",
			imageUrl:
				"https://media.dodostatic.net/image/r:292x292/0198bf3e424371b49f0b8d7dbe320a70.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(10, 40),
			},
		},
	});

	await prisma.productVariant
		.createMany({
			data: [
				// Пепперони фреш
				generateProductItem({
					id: 1,
					productId: pizza1.id,
					pizzaType: 1,
					size: 20,
				}),
				generateProductItem({
					id: 2,
					productId: pizza1.id,
					pizzaType: 2,
					size: 30,
				}),
				generateProductItem({
					id: 3,
					productId: pizza1.id,
					pizzaType: 2,
					size: 40,
				}),

				// Сырная
				generateProductItem({
					id: 4,
					productId: pizza2.id,
					pizzaType: 1,
					size: 20,
				}),
				generateProductItem({
					id: 5,
					productId: pizza2.id,
					pizzaType: 1,
					size: 30,
				}),
				generateProductItem({
					id: 6,
					productId: pizza2.id,
					pizzaType: 1,
					size: 40,
				}),
				generateProductItem({
					id: 7,
					productId: pizza2.id,
					pizzaType: 2,
					size: 20,
				}),
				generateProductItem({
					id: 8,
					productId: pizza2.id,
					pizzaType: 2,
					size: 30,
				}),
				generateProductItem({
					id: 9,
					productId: pizza2.id,
					pizzaType: 2,
					size: 40,
				}),

				// Чоризо фреш
				generateProductItem({
					id: 10,
					productId: pizza3.id,
					pizzaType: 1,
					size: 20,
				}),
				generateProductItem({
					id: 11,
					productId: pizza3.id,
					pizzaType: 2,
					size: 30,
				}),
				generateProductItem({
					id: 12,
					productId: pizza3.id,
					pizzaType: 2,
					size: 40,
				}),

				// Остальные продукты
				generateProductItem({ id: 13, productId: 1 }),
				generateProductItem({ id: 14, productId: 2 }),
				generateProductItem({ id: 15, productId: 3 }),
				generateProductItem({ id: 16, productId: 4 }),
				generateProductItem({ id: 17, productId: 5 }),
				generateProductItem({ id: 18, productId: 6 }),
				generateProductItem({ id: 19, productId: 7 }),
				generateProductItem({ id: 20, productId: 8 }),
				generateProductItem({ id: 21, productId: 9 }),
				generateProductItem({ id: 22, productId: 10 }),
				generateProductItem({ id: 23, productId: 11 }),
				generateProductItem({ id: 24, productId: 12 }),
				generateProductItem({ id: 25, productId: 13 }),
				generateProductItem({ id: 26, productId: 14 }),
				generateProductItem({ id: 27, productId: 15 }),
				generateProductItem({ id: 28, productId: 16 }),
				generateProductItem({ id: 29, productId: 17 }),
			],
		})
		.then(() => {
			console.log("✅ Варианты продуктов добавлены");
		});

	await prisma.cart
		.createMany({
			data: [
				{ id: 1, userId: 1, totalAmount: 0, token: "11111" },
				{ id: 2, userId: 2, totalAmount: 0, token: "22222" },
			],
		})
		.then(() => {
			console.log("✅ Корзины добавлены");
		});

	await prisma.cartItem
		.create({
			data: {
				id: 1,
				productItemId: 1,
				cartId: 1,
				quantity: 2,
				ingredients: {
					connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
				},
			},
		})
		.then(() => {
			console.log("✅ Продукт в корзину добавлен");
		});

	await prisma.story
		.createMany({
			data: [
				{
					id: 1,
					previewImageUrl:
						"https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
				},
				{
					id: 2,
					previewImageUrl:
						"https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
				},
				{
					id: 3,
					previewImageUrl:
						"https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
				},
				{
					id: 4,
					previewImageUrl:
						"https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
				},
				{
					id: 5,
					previewImageUrl:
						"https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
				},
				{
					id: 6,
					previewImageUrl:
						"https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
				},
			],
		})
		.then(() => {
			console.log("✅ Story добавлены");
		});

	await prisma.storyItem
		.createMany({
			data: [
				{
					storyId: 1,
					sourceUrl:
						"https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
				},
				{
					storyId: 1,
					sourceUrl:
						"https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
				},
				{
					storyId: 1,
					sourceUrl:
						"https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
				},
				{
					storyId: 1,
					sourceUrl:
						"https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
				},
				{
					storyId: 1,
					sourceUrl:
						"https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
				},
			],
		})
		.then(() => {
			console.log("✅ StoryItem добавлены");
		});
}

async function down() {
	await prisma.cartItem.deleteMany({});
	await prisma.productVariant.deleteMany({});
	await prisma.cart.deleteMany({});
	await prisma.order.deleteMany({});
	await prisma.product.deleteMany({});
	await prisma.ingredient.deleteMany({});
	await prisma.category.deleteMany({});
	await prisma.user.deleteMany({});
	await prisma.storyItem.deleteMany({});
	await prisma.story.deleteMany({});
	console.log("✅ База данных очищена ✅");
}

async function main() {
	try {
		await down();
		await up();
	} catch (error) {
		console.error(error);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
