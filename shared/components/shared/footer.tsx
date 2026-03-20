import { cn } from "@/shared/utils";
import Image from "next/image";
import React from "react";

interface Props {
	className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				"border-t p-10 bg-[#181818] text-white flex justify-between items-center gap-2",
				className,
			)}
		>
			<div className="max-w-[450px] overflow-hidden leading-4.5 flex items-center gap-5">
				<Image src="/logo.png" alt="Logo" width={43} height={43} />
				<div>
					<p>© 2026 ООО “Next Pizza Франчайзинг”</p>
					<p>
						123123, Республика Пиццы, г. Пицца, Пиццерийный
						проспект, д. 8
					</p>
				</div>
			</div>

			<p className="text-2xl uppercase font-black">8 (800) 555-35-35</p>
		</div>
	);
};
