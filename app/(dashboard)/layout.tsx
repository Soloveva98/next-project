import { getUserSession } from "@/shared/utils/get-user-session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Next Pizza | Главная",
};

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getUserSession();
	const isAdmin = user?.role === "ADMIN";

	if (!isAdmin) {
		redirect("/");
	}

	return <main>{children}</main>;
}
