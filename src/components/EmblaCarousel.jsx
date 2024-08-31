import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { fetchTrendingStreams } from "@/actions/getActions";
import { cn } from "@/lib/utils";
import RatingStars from "./RatingStars";

// Component to display a carousel of trending streams (tv shows/movies)
const EmblaCarousel = ({ options, endpoint }) => {
	// State to hold the fetched data
	const [trendingStreams, setTrendingStreams] = useState([]);

	// Function to fetch the trending streams data
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetching streams data
				const streams = await fetchTrendingStreams(endpoint);
				setTrendingStreams(streams);
			} catch (error) {
				console.error("Failed to fetch trending streams:", error);
			}
		};

		fetchData();
	}, [endpoint]);

	// Initializing the Embla carousel
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		AutoScroll({
			playOnInit: true,
			stopOnMouseEnter: true,
			stopOnInteraction: false,
			startDelay: 0,
			speed: 0.8,
			direction: "forward",
		}),
	]);
	const [isPlaying, setIsPlaying] = useState(true);

	// Function to handle the carousel auto-scroll state changes
	useEffect(() => {
		const autoScroll = emblaApi?.plugins()?.autoScroll;
		if (!autoScroll) return;

		setIsPlaying(autoScroll.isPlaying());
		emblaApi
			.on("autoScroll:play", () => setIsPlaying(true))
			.on("autoScroll:stop", () => setIsPlaying(false))
			.on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
	}, [emblaApi]);

	return (
		<div className="relative embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{trendingStreams.map((stream) => (
						<Dialog key={stream.id}>
							{/* Carousel slide for each stream */}
							<DialogTrigger className="embla__slide">
								<div className="embla__slide__inner group">
									{/* Stream poster image */}
									<img
										src={`https://image.tmdb.org/t/p/w500/${stream.poster_path}`}
										className="embla__slide__img relative h-full shadow-md shadow-black/50"
										alt={stream.title}
									/>
									{/* Rating and media type label */}
									<div className="absolute px-2 w-16 h-16 z-50 top-0 right-0 text-xl font-bold bg-gradient-to-bl from-[#47C300]/80 to-[#A2C900]/80 rounded-bl-3xl flex flex-col items-center justify-center">
										<span className="text-xs text-center">{stream.media_type === "tv" ? "Série TV" : "Film"}</span>
										{stream.vote_average.toFixed(1)}
									</div>
								</div>
							</DialogTrigger>

							{/* Modal displaying the detailed stream information */}
							<DialogContent
								aria-describedby={stream.name}
								className="p-0 w-full h-full overflow-y-scroll md:overflow-y-hidden md:w-[inherit] md:h-[inherit] pt-10 md:pt-0 bg-black md:shadow-lg dark:shadow-[#A2C900]/30"
							>
								<div className="flex flex-col md:flex-row">
									{/* Stream poster */}
									<img src={`https://image.tmdb.org/t/p/w500/${stream.poster_path}`} alt={stream.name} className="w-[300px] h-auto mx-auto object-cover" />

									{/* Stream details */}
									<div className="px-8 flex flex-col">
										{/* Stream title */}
										<DialogTitle
											className={cn(
												`text-center`,
												(stream.name && stream.name.length > 30) || (stream.title && stream.title.length > 30) ? "text-xl" : "text-2xl"
											)}
										>
											{stream.media_type === "tv" ? stream.name : stream.title}
										</DialogTitle>

										{/* Stream description */}
										<DialogDescription className="text-gray-400 text-justify text-base mt-2 mb-6">{stream.overview}</DialogDescription>

										{/* Stream release date or first air date */}
										<p className="text-[#A2C900] font-bold mb-1">
											{stream.media_type === "tv" ? (
												<>
													<span className="text-gray-400 font-bold">Date de première diffusion:</span> {stream.first_air_date}
												</>
											) : (
												<>
													<span className="text-gray-400 font-bold">Date de sortie:</span> {stream.release_date}
												</>
											)}
										</p>

										{/* Stream rating stars */}
										<RatingStars voteAverage={stream.vote_average} voteCount={stream.vote_count} />

										{/* Button for more details */}
										<a
											href={`/${stream.media_type === "tv" ? "tv" : "movie"}/${stream.id}`}
											className="bg-[#A2C900] text-white flex items-center justify-center hover:opacity-80 font-bold py-2 px-4 mb-6 uppercase transition-all duration-300"
										>
											Plus de détails
										</a>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					))}
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
