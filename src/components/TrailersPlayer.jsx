import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const TrailersPlayer = ({ trailers }) => {
	const [activeTrailer, setActiveTrailer] = useState(null);
	const [showArrows, setShowArrows] = useState(false);
	const carouselRef = useRef(null);

	useEffect(() => {
		if (trailers.length > 0) {
			setActiveTrailer(trailers[0]);
		}
	}, [trailers]);

	useEffect(() => {
		const updateShowArrows = () => {
			if (carouselRef.current) {
				const itemsHeight = carouselRef.current.scrollHeight;
				const containerHeight = carouselRef.current.clientHeight;
				setShowArrows(itemsHeight > containerHeight);
			}
		};
		updateShowArrows();
		window.addEventListener("resize", updateShowArrows);
		return () => window.removeEventListener("resize", updateShowArrows);
	}, [trailers]);

	if (!activeTrailer) {
		return null; // Return null instead of undefined
	}

	return (
		<div className="w-full h-auto mx-auto flex items-center gap-6">
			<div className="w-full lg:w-auto lg:h-[500px] aspect-video mx-auto px-4 lg:px-0">
				<iframe src={`https://www.youtube.com/embed/${activeTrailer.key}`} title={activeTrailer.name} className="w-full h-full" loading="lazy"></iframe>
			</div>
			<div className="w-auto lg:h-[500px] m-auto hidden lg:flex flex-col">
				<Carousel
					ref={carouselRef}
					opts={{
						align: "start",
						loop: true,
					}}
					orientation="vertical"
					className="w-full"
				>
					{showArrows && <CarouselPrevious className="h-[40px]" />}
					<CarouselContent className="h-[calc(100%-80px)] flex flex-col gap-y-4">
						{trailers.map((trailer, index) => (
							<CarouselItem
								key={trailer.id}
								className="flex-grow"
								style={{ height: "calc(100% / 3 - 1rem)" }} // Adjust height to fit 3 thumbnails
							>
								<div
									onClick={() => setActiveTrailer(trailer)}
									className="aspect-video cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
								>
									<img
										src={`https://i.ytimg.com/vi/${trailer.key}/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLANhrIEj3mj-HVSt29Zu0si4-8LfQ`}
										alt={trailer.name}
										className="w-full h-full object-cover"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					{showArrows && <CarouselNext className="h-[40px]" />}
				</Carousel>
			</div>
		</div>
	);
};

export default TrailersPlayer;
