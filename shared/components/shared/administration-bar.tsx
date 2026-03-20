"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/shared/utils";
import { Button } from "../ui";
import { Settings } from "lucide-react";
import { useSession } from "next-auth/react";

interface Props {
	isCompress?: boolean;
	className?: string;
}

export const AdministrationBar: React.FC<Props> = ({
	isCompress = false,
	className,
}) => {
	const { data: session, status } = useSession();
	const isAdmin = session?.user?.role === "ADMIN";

	if (status === "loading" || !isAdmin) {
		return null;
	}

	return isCompress ? (
		<Link href="/dashboard">
			<Button className="cursor-pointer">
				<Settings size={24} />
			</Button>
		</Link>
	) : (
		<div
			className={cn(
				className,
				"order-b p-3 bg-primary flex justify-between items-center gap-3",
			)}
		>
			<span className="text-white font-bold">
				ADMIN - {session?.user?.name}
			</span>

			<Link href="/dashboard">
				<Button className="font-extrabold cursor-pointer bg-white text-primary hover:bg-primary hover:text-white">
					Перейти в администрирование сайта
				</Button>
			</Link>
		</div>
	);
};
