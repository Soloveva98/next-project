import type { NextAdminOptions } from "@premieroctet/next-admin";
import { mapPizzaType, PizzaType } from "@/shared/constants";

export const options: NextAdminOptions = {
	title: "⚡️ Панель управления",
	defaultColorScheme: "",
	sidebar: {
		groups: [
			{
				title: "Продукты",
				className: "font-extrabold text-primary",
				models: ["Category", "Product", "ProductVariant", "Ingredient"],
			},
			{
				title: "Акции",
				className: "font-extrabold text-primary",
				models: ["Story", "StoryItem"],
			},
			{
				title: "Пользователи",
				className: "font-extrabold text-primary",
				models: [
					"User",
					"Order",
					"Cart",
					"CartItem",
					"VerificationCode",
				],
			},
		],
	},
	model: {
		User: {
			icon: "UsersIcon",
			toString: (user) => `${user.fullName}`,
		},
		Category: {
			icon: "InboxStackIcon",
			toString: (category) => `${category.name}`,
		},
		Product: {
			icon: "ShoppingBagIcon",
			toString: (product) => `${product.name}`,
			list: {
				fields: {
					category: {
						formatter: (category) => category.name,
					},
				},
			},
		},
		ProductVariant: {
			icon: "QueueListIcon",
			toString: (productVariant) => `id - ${productVariant.id}`,
			list: {
				fields: {
					pizzaType: {
						formatter: (type) => {
							return type
								? mapPizzaType[type as PizzaType]
								: type;
						},
					},
					product: {
						formatter: (product) => product.name,
					},
				},
			},
		},
		Ingredient: {
			icon: "BeakerIcon",
			toString: (ing) => `${ing.name}`,
		},
		Cart: {
			icon: "ShoppingCartIcon",
			toString: (cart) => `id - ${cart.id}`,
		},
		CartItem: {
			icon: "ShoppingBagIcon",
			toString: (cartItem) => `id - ${cartItem.id}`,
		},
		Order: {
			icon: "CreditCardIcon",
			toString: (order) => `id - ${order.id}`,
		},
		Story: {
			icon: "PlayCircleIcon",
			toString: (story) => `id - ${story.id}`,
		},
		StoryItem: {
			icon: "PhotoIcon",
			toString: (storyItem) => `id - ${storyItem.id}`,
		},
		VerificationCode: {
			icon: "KeyIcon",
			toString: (code) => `id - ${code.id}`,
		},
	},
	externalLinks: [
		{
			label: "Вернуться на сайт",
			url: "/",
		},
	],
};
