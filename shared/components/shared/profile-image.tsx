import { cn } from "@/shared/utils";
import React from "react";

interface Props {
	className?: string;
}

export const ProfileImage: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				className,
				"flex flex-1 justify-center min-w-[400px]",
			)}
		>
			<img
				src="/assets/images/pizza3.jpg"
				alt="pizza-icon"
				width={400}
				height={400}
				className="rounded-4xl mask-gradient max-h-[400px] min-w-[400px]"
				style={{
					maskImage:
						"radial-gradient(circle at center, black 40%, transparent 76%)",
					WebkitMaskImage:
						"radial-gradient(circle at center, black 40%, transparent 76%)",
				}}
			/>
		</div>
	);
};
