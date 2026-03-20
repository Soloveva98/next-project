"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactStories from "react-insta-stories";
import { Container } from "./container";
import { cn } from "@/shared/utils/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { IStory } from "@/shared/services/stories";
import { Api } from "@/shared/services/api-client";

interface Props {
	className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = useState<IStory[]>([]);
	const [open, setOpen] = useState(false);
	const [selectedStory, setSelectedStory] = useState<IStory>();
	const sliderRef = useRef<HTMLDivElement | null>(null);
	const [showSliderBtn, setShowSliderBtn] = useState({
		left: false,
		right: false,
	});

	// get stories
	useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll();
			setStories(data);
		}

		fetchStories();
	}, []);

	const onClickStory = (story: IStory) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		}
	};

	const checkScrollPosition = useCallback(() => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const hasOverflow = scrollWidth > clientWidth;

			if (!hasOverflow) {
				setShowSliderBtn({ left: false, right: false });

				return;
			}

			setShowSliderBtn({
				left: scrollLeft > 0,
				right: scrollLeft < scrollWidth - clientWidth - 1,
			});
		}
	}, []);

	// check scroll position
	useEffect(() => {
		const slider = sliderRef.current;

		if (slider) {
			checkScrollPosition();

			slider.addEventListener("scroll", checkScrollPosition);
			window.addEventListener("resize", checkScrollPosition);

			return () => {
				slider.removeEventListener("scroll", checkScrollPosition);
				window.removeEventListener("resize", checkScrollPosition);
			};
		}
	}, [checkScrollPosition, stories]);

	const handleScrollSlider = (direction: string) => {
		if (sliderRef.current) {
			const scrollValue = direction === "left" ? -220 : 220;
			sliderRef.current.scrollBy({
				left: scrollValue,
				behavior: "smooth",
			});
		}
	};

	return (
		<>
			<Container className={cn("my-10", className)}>
				<div className="relative overflow-hidden">
					{showSliderBtn.left && (
						<button
							className="absolute left-1 top-1/2 -translate-y-1/2 cursor-pointer bg-white rounded-full p-0.5"
							onClick={() => handleScrollSlider("left")}
						>
							<ChevronLeft size={24} className="text-primary" />
						</button>
					)}

					{showSliderBtn.right && (
						<button
							className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer bg-white rounded-full p-0.5"
							onClick={() => handleScrollSlider("right")}
						>
							<ChevronRight size={24} className="text-primary" />
						</button>
					)}

					<div
						ref={sliderRef}
						className="flex items-center justify-between gap-2 px-0.5 overflow-x-auto scrollbar-hide scroll-smooth pb-2 "
					>
						{stories.length === 0
							? [...Array(6)].map((_, index) => (
									<div
										key={index}
										className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
									/>
								))
							: stories.map((story) => (
									<img
										key={story.id}
										className="rounded-md cursor-pointer"
										height={250}
										width={200}
										src={story.previewImageUrl}
										onClick={() => onClickStory(story)}
									/>
								))}
					</div>
				</div>

				{open && (
					<div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
						<div className="relative" style={{ width: 520 }}>
							<button
								className="absolute -right-10 -top-5 z-30"
								onClick={() => setOpen(false)}
							>
								<X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
							</button>

							<ReactStories
								onAllStoriesEnd={() => setOpen(false)}
								stories={
									selectedStory?.items.map((item) => ({
										url: item.sourceUrl,
									})) || []
								}
								defaultInterval={3000}
								width={520}
								height={800}
							/>
						</div>
					</div>
				)}
			</Container>
		</>
	);
};
