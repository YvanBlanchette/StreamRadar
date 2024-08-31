import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import RatingStars from "@/components/RatingStars";
import { fetchNowPlaying } from "@/actions/getActions";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Error from "./Error";

// Component to display a carousel of currently playing streams (tv shows/movies)
const Featured = ({ endpoint, title }) => {
	// State to hold the list of currently playing streams
	const [nowPlaying, setNowPlaying] = useState([]);

	// State to manage the loading state
	const [loading, setLoading] = useState(true);

	// State to manage potential errors
	const [error, setError] = useState(null);

	useEffect(() => {
		// Function to fetch data
		const fetchData = async () => {
			try {
				// Set loading to true before fetching
				setLoading(true);

				// Fetch data from the API
				const streams = await fetchNowPlaying(endpoint);

				// Update state with the fetched streams
				setNowPlaying(streams.results);
			} catch (err) {
				// Set error state if an error occurs
				setError("Une erreur est survenue lors du chargement des Streams.");
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
		return <Error message="Aucun Stream à afficher pour le moment." />;
	}

	return (
		// Carousel options
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
					<CarouselItem key={stream.id} className="relative w-full min-h-[110vh] flex flex-col items-center justify-center">
						<div className="absolute mx-auto">
							{/* Carousel title */}
							<h2 className="col-span-2 text-2xl md:text-4xl lg:text-6xl font-bold mb-8 text-center uppercas">{title}</h2>
							<div className="flex flex-col lg:flex-row justify-center items-center gap-4 mx-auto">
								{/* Poster image */}
								<div className="h-[450px] aspect-[2/2] cols-span-2 md:col-span-1 ml-auto flex flex-col justify-center items-center px-[5vw] mx-auto">
									<img
										src={`https://image.tmdb.org/t/p/original/${stream.poster_path}`}
										alt={stream.media_type === "movie" ? stream.title : stream.name}
										className="w-full h-full object-cover mr-2"
									/>
								</div>
								<div className="cols-span-2 md:col-span-1 z-20  ml-2 flex flex-col items-center lg:items-start px-[5%] mx-auto">
									{/* Stream title */}
									<h3 className="text-3xl font-bold mb-2">{stream.title || stream.name}</h3>
									{/* Stream Rating */}
									<RatingStars voteAverage={stream.vote_average} voteCount={stream.vote_count} />
									{/* Stream overview */}
									<p className="text-justify lg:text-lg text-base pb-6">{stream.overview}</p>
									{/* Details button */}
									<a
										href={stream.first_air_date ? `/tv/${stream.id}` : `/movie/${stream.id}`}
										className="bg-[#A2C900] text-white flex items-center justify-center hover:opacity-80 font-bold py-2 px-4 mb-6 uppercase transition-all duration-300 w-full lg:w-fit cursor-pointer"
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
