import { PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import { NextAdmin } from "@premieroctet/next-admin/adapters/next";
import { prisma } from "@/prisma/prisma-client";
import type { NextAdminOptions, PrismaClient } from "@premieroctet/next-admin";
import Link from "next/link";

const options: NextAdminOptions = {
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
			title: "Пользователи",
			icon: "UsersIcon",
			toString: (user) => `${user.fullName}`,
		},
		Category: {
			title: "Категории",
			icon: "InboxStackIcon",
			toString: (user) => `${user.name}`,
		},
		Product: {
			title: "Продукты",
			icon: "ShoppingBagIcon",
			toString: (user) => `${user.name}`,
		},
		ProductVariant: {
			title: "Варианты продуктов",
			icon: "QueueListIcon",
		},
		Ingredient: {
			title: "Ингредиенты",
			icon: "BeakerIcon",
			toString: (user) => `${user.name}`,
		},
		Cart: {
			title: "Корзины",
			icon: "ShoppingCartIcon",
		},
		CartItem: {
			title: "Продукты в корзине",
			icon: "ShoppingBagIcon",
		},
		Order: {
			title: "Заказы",
			icon: "CreditCardIcon",
		},
		Story: {
			title: "Акции (stories)",
			icon: "PlayCircleIcon",
		},
		StoryItem: {
			title: "Экраны внутри акции (story items)",
			icon: "PhotoIcon",
		},
		VerificationCode: {
			title: "Коды верификации",
			icon: "KeyIcon",
		},
	},
};

export default async function DashboardPage({
	params,
	searchParams,
}: PageProps) {
	const resolvedParams = await params;
	const resolvedSearchParams = await searchParams;
	const props = await getNextAdminProps({
		params: resolvedParams.nextadmin,
		searchParams: resolvedSearchParams,
		basePath: "/dashboard",
		apiBasePath: "/api/dashboard",
		prisma: prisma as PrismaClient,
		// locale: "ru", // TODO: почему-то не применяется и вообще херня с урлами начинается
		options,
	});

	return (
		<>
			<div className="border-b w-full fixed top-0 z-55 h-[50px] bg-secondary flex justify-end px-4 items-center">
				<Link href="/">
					<button className="text-white bg-primary rounded-md px-4 py-1 hover:bg-primary-dark cursor-pointer">
						Перейти на сайт
					</button>
				</Link>
			</div>
			<NextAdmin {...props} />
		</>
	);
}
