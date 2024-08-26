import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import RatingStars from "@/components/RatingStars";
import { fetchNowPlaying } from "@/actions/getActions";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Error from "./Error";

const Featured = ({ endpoint, title }) => {
	// State to store the fetched streams data
	const [nowPlaying, setNowPlaying] = useState([]);

	// State to store the loading state
	const [loading, setLoading] = useState(true);

	// State to store the error state
	const [error, setError] = useState(null);

	useEffect(() => {
		// Function to fetch the Streams data
		const fetchData = async () => {
			try {
				// Set loading state to true to show the spinner while fetching the data
				setLoading(true);

				// Fetching the streams data
				const streams = await fetchNowPlaying(endpoint);

				// Set the fetched streams data in the state
				setNowPlaying(streams.results);

				console.log(streams.results);
			} catch (error) {
				setError("Failed to fetch data.");
				// Handle errors
				console.error(error);
			} finally {
				// Set loading state to false to hide the spinner
				setLoading(false);
			}
		};

		// Call the fetchData function
		fetchData();
	}, [endpoint]);

	// Loading state for Movie details
	if (loading) {
		return <Spinner />;
	}

	// Error state for Movie details
	if (error) {
		return <Error message={error} />;
	}

	if (nowPlaying.length === 0) {
		return <Error message="Aucun film à afficher pour le moment." />;
	}

	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 5000,
					loop: true,
					stopOnInteraction: false,
				}),
				Fade(),
			]}
			className="relative inset-0 w-full z-0 overflow-hidden md:shadow-lg dark:shadow-[#A2C900]/30"
		>
			<CarouselContent>
				{nowPlaying.map((stream) => (
					<CarouselItem key={stream.id} className="relative w-full h-[100vh] flex flex-col items-center justify-center">
						<div className="absolute mx-auto">
							<h2 className="col-span-2 text-6xl font-bold mb-8 text-center uppercase">{title}</h2>
							<div className="flex justify-center gap-4 mx-auto">
								<div className="h-[450px] aspect-[9/13] cols-span-2 md:col-span-1 ml-auto">
									<img
										src={`https://image.tmdb.org/t/p/original/${stream.poster_path}`}
										alt={stream.media_type === "movie" ? stream.title : stream.name}
										className="w-full h-full object-cover mr-2"
									/>
								</div>
								<div className="cols-span-2 md:col-span-1 z-20 w-[500px] ml-2">
									<h3 className="text-3xl font-bold mb-2">{stream.title}</h3>
									<RatingStars voteAverage={stream.vote_average} voteCount={stream.vote_count} />
									<p className="text-justify text-lg pb-6">{stream.overview}</p>
									<a
										href={`/movie/${stream.id}`}
										className="bg-[#A2C900] text-white flex items-center justify-center hover:opacity-80 font-bold py-2 px-4 mb-6 uppercase transition-all duration-300 w-fit cursor-pointer"
									>
										Tous les détails
									</a>
								</div>
							</div>
						</div>
						<img
							src={`https://image.tmdb.org/t/p/original/${stream.backdrop_path}`}
							alt={stream.media_type === "movie" ? stream.title : stream.name}
							className="w-full h-full object-cover opacity-20 -z-50"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};

export default Featured;
