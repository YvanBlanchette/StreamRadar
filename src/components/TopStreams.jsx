import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { fetchMostPopulars } from "@/actions/getActions";
import StreamCard from "./StreamCard";

const TopStreams = ({ endpoint }) => {
	// State to store the streams data
	const [streams, setStreams] = useState([]);

	// Default endpoint for fetching the most popular streams
	const defaultEndpoint = "trending/all/week";

	// Function to fetch data
	useEffect(() => {
		const fetchData = async (url) => {
			try {
				// Fetching the streams data
				const results = await fetchMostPopulars(url);

				if (results.length === 0 && url !== defaultEndpoint) {
					// Re-fetch with the default endpoint only if results are empty and it's not the same as the default endpoint
					const defaultResults = await fetchMostPopulars(defaultEndpoint);
					setStreams(defaultResults);
				} else {
					// Set the fetched streams data in the state
					setStreams(results);
				}
			} catch (error) {
				// Handle errors
				console.error(error);
			}
		};

		// Call the fetchData function with the provided endpoint
		fetchData(endpoint);
	}, [endpoint]);

	return (
		<div className="w-full h-full">
			{/* Carousel of the most popular streams */}
			<Carousel
				// Carousel options
				opts={{
					align: "start",
					loop: true,
				}}
				className="w-full max-w-[90%] mx-auto"
			>
				<CarouselContent>
					{streams.map((stream) => (
						<CarouselItem key={stream.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
							<StreamCard stream={stream} />
						</CarouselItem>
					))}
				</CarouselContent>
				{/* Previous and next buttons for the carousel, visible on medium screens and larger */}
				<CarouselPrevious className="hidden md:block -translate-x-6" />
				<CarouselNext className="hidden md:block translate-x-6" />
			</Carousel>
		</div>
	);
};

export default TopStreams;
