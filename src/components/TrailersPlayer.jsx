import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const TrailersPlayer = ({ trailers }) => {
	// State to store the currently active trailer
	const [activeTrailer, setActiveTrailer] = useState(null);

	// State to control the visibility of carousel navigation arrows
	const [showArrows, setShowArrows] = useState(false);

	// Ref to access the carousel DOM element
	const carouselRef = useRef(null);

	useEffect(() => {
		// Set the first trailer as the active trailer when the trailers array is updated
		if (trailers.length > 0) {
			setActiveTrailer(trailers[0]);
		}
	}, [trailers]);

	useEffect(() => {
		const updateShowArrows = () => {
			if (carouselRef.current) {
				const itemsHeight = carouselRef.current.scrollHeight; // Total height of carousel content
				const containerHeight = carouselRef.current.clientHeight; // Height of carousel container
				setShowArrows(itemsHeight > containerHeight); // Show arrows if content is taller than container
			}
		};

		updateShowArrows(); // Initial check
		window.addEventListener("resize", updateShowArrows); // Update arrows visibility on window resize

		// Cleanup event listener on component unmount
		return () => window.removeEventListener("resize", updateShowArrows);
	}, [trailers]);

	if (!activeTrailer) {
		return null; // Return null if there is no active trailer
	}

	return (
		<div className="w-full h-auto mx-auto flex items-center gap-6">
			{/* Video player */}
			<div className="w-full lg:w-auto lg:h-[500px] aspect-video mx-auto px-4 lg:px-0">
				<iframe src={`https://www.youtube.com/embed/${activeTrailer.key}`} title={activeTrailer.name} className="w-full h-full"></iframe>
			</div>

			{/* Vertical carousel for trailer thumbnails */}
			<div className="w-auto lg:h-[500px] m-auto hidden lg:flex flex-col">
				<Carousel
					ref={carouselRef}
					opts={{
						align: "start",
						loop: true,
					}}
					orientation="vertical" // Carousel orientation
					className="w-full"
				>
					{/* Conditionally render previous arrow */}
					{showArrows && <CarouselPrevious className="h-[40px]" />}

					<CarouselContent className="h-[calc(100%-80px)] flex flex-col gap-y-4">
						{trailers.map((trailer, index) => (
							<CarouselItem
								key={trailer.id}
								className="flex-grow"
								style={{ height: "calc(100% / 3 - 1rem)" }} // Adjust height to fit 3 thumbnails
							>
								<div
									onClick={() => setActiveTrailer(trailer)} // Set clicked trailer as active
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

					{/* Conditionally render next arrow */}
					{showArrows && <CarouselNext className="h-[40px]" />}
				</Carousel>
			</div>
		</div>
	);
};

export default TrailersPlayer;
