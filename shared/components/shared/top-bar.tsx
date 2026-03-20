"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
	Categories,
	Container,
	CartButton,
	AdministrationBar,
} from "@/components/index";
import { cn } from "@/shared/utils";
import { Category } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Props {
	categories: Category[];
	hasCart?: boolean;
	className?: string;
}

export const TopBar: React.FC<Props> = ({
	categories,
	hasCart = true,
	className,
}) => {
	const { data: session, status } = useSession();
	const isAdmin = status !== "loading" && session?.user?.role === "ADMIN";
	const [showBtnsInTopBar, setShowBtnsInTopBar] = useState(false);

	const checkHeaderVisibility = useCallback(() => {
		const header = document.querySelector("#main-header");

		if (header) {
			const headerBottom = header.getBoundingClientRect().bottom;
			setShowBtnsInTopBar(headerBottom < 0);
		}
	}, []);

	useEffect(() => {
		checkHeaderVisibility();

		window.addEventListener("scroll", checkHeaderVisibility, {
			passive: true,
		});
		window.addEventListener("resize", checkHeaderVisibility);

		return () => {
			window.removeEventListener("scroll", checkHeaderVisibility);
			window.removeEventListener("resize", checkHeaderVisibility);
		};
	}, []);

	return (
		<div
			className={cn(
				"sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 px-3",
				className,
			)}
		>
			<Container className="flex items-center justify-between">
				<Categories items={categories} />

				<div className="flex gap-2">
					{hasCart && showBtnsInTopBar && (
						<div className="animate-in fade-in slide-in-from-right-5 duration-500">
							<CartButton />
						</div>
					)}

					{showBtnsInTopBar && isAdmin && (
						<div className="animate-in fade-in slide-in-from-right-5 duration-500">
							<AdministrationBar isCompress />
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};
