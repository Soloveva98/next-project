import { prisma } from "@/prisma/prisma-client";
import { createHandler } from "@premieroctet/next-admin/appHandler";
import type { PrismaClient } from "@premieroctet/next-admin";
import { NextRequest } from "next/server";

const { run } = createHandler({
	apiBasePath: "/api/dashboard",
	prisma: prisma as PrismaClient,
});

const createRunWrapper = (method: typeof run) => {
	return async (
		req: NextRequest,
		context: { params: Promise<{ nextadmin?: string[] }> },
	) => {
		const { nextadmin = [] } = await context.params;
		return method(req, {
			params: Promise.resolve({ nextadmin }),
		});
	};
};

export const GET = createRunWrapper(run);
export const POST = createRunWrapper(run);
export const DELETE = createRunWrapper(run);
