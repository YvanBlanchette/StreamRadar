import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import RatingStars from "@/components/RatingStars";
import { fetchNowPlaying } from "@/actions/getActions";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Error from "./Error";

// Component to display a carousel of currently playing movies or shows
const Featured = ({ endpoint, title }) => {
	// State to hold the list of currently playing streams
	const [nowPlaying, setNowPlaying] = useState([]);

	// State to manage the loading state
	const [loading, setLoading] = useState(true);

	// State to manage any errors that occur during data fetching
	const [error, setError] = useState(null);

	useEffect(() => {
		// Function to fetch data from the provided endpoint
		const fetchData = async () => {
			try {
				// Set loading to true before fetching
				setLoading(true);

				// Fetch data from the API
				const streams = await fetchNowPlaying(endpoint);

				// Update state with the fetched streams
				setNowPlaying(streams.results);
				console.log(streams.results);
			} catch (err) {
				// Set error state if an error occurs
				setError("Failed to fetch data.");
				console.error(err);
			} finally {
				// Turn off loading indicator
				setLoading(false);
			}
		};

		// Call fetchData when the component mounts or endpoint changes
		fetchData();
	}, [endpoint]);

	// Show a spinner while data is loading
	if (loading) {
		return <Spinner />;
	}

	// Display an error message if there was an error fetching data
	if (error) {
		return <Error message={error} />;
	}

	// Display an error message if no data is available
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
							{/* Carousel title */}
							<h2 className="col-span-2 text-6xl font-bold mb-8 text-center uppercase">{title}</h2>
							<div className="flex justify-center gap-4 mx-auto">
								{/* Poster image */}
								<div className="h-[450px] aspect-[9/13] cols-span-2 md:col-span-1 ml-auto">
									<img
										src={`https://image.tmdb.org/t/p/original/${stream.poster_path}`}
										alt={stream.media_type === "movie" ? stream.title : stream.name}
										className="w-full h-full object-cover mr-2"
									/>
								</div>
								<div className="cols-span-2 md:col-span-1 z-20 w-[500px] ml-2">
									{/* Stream title */}
									<h3 className="text-3xl font-bold mb-2">{stream.title || stream.name}</h3>
									{/* Rating stars */}
									<RatingStars voteAverage={stream.vote_average} voteCount={stream.vote_count} />
									{/* Stream overview */}
									<p className="text-justify text-lg pb-6">{stream.overview}</p>
									{/* Details button */}
									<a
										href={stream.first_air_date ? `/tv/${stream.id}` : `/movie/${stream.id}`}
										className="bg-[#A2C900] text-white flex items-center justify-center hover:opacity-80 font-bold py-2 px-4 mb-6 uppercase transition-all duration-300 w-fit cursor-pointer"
									>
										Tous les détails
									</a>
								</div>
							</div>
						</div>
						{/* Backdrop image */}
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
