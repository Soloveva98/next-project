import { Suspense } from "react";
import type { Metadata } from "next";
import { AdministrationBar, Header } from "@/components/index";

export const metadata: Metadata = {
	title: "Next Pizza | Главная",
};

export default async function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen">
			<Suspense>
				<AdministrationBar />
			</Suspense>

			<Suspense>
				<Header />
			</Suspense>

			{children}
			{modal}
		</main>
	);
}
