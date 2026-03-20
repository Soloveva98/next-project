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
		// TODO:
		// overflow-auto h-[100vh] - из-за этого пропадает отображение ккнопки корзины в тооп баре при скролле, н опри этом решает проблему прокрутки при открытии модального окна

		// Можно попробовать добавлять эти стили в момент открытия модалки - но сомнительно
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
