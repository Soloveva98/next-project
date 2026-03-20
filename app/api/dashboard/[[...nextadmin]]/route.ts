import { prisma } from "@/prisma/prisma-client";
import { createHandler } from "@premieroctet/next-admin/appHandler";

const { run } = createHandler({
	apiBasePath: "/api/dashboard",
	prisma,
	/*options*/
});

export { run as DELETE, run as GET, run as POST };
