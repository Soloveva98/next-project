import { PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import { NextAdmin } from "@premieroctet/next-admin/adapters/next";
import { prisma } from "../../../../prisma/prisma-client";
import type { PrismaClient } from "@premieroctet/next-admin";
import { getMessages, options } from "@/shared/constants";

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
		options,
		getMessages,
	});

	return <NextAdmin {...props} />;
}
