import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaImdb } from "react-icons/fa";
import { fetchStreamDetails } from "@/actions/getActions";
import { runtimeFormatted, dateFormatted } from "@/lib/utils";
import RatingStars from "@/components/RatingStars";
import TrailersPlayer from "@/components/TrailersPlayer";
import TopTenStreams from "@/components/ui/TopTenStreams";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";

const MovieDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [movieTrailers, setMovieTrailers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch the movie details and trailers
		const fetchData = async () => {
			try {
				// Set loading state to true to show the spinner while fetching the data
				setLoading(true);

				// Fetching of the movie details and trailers in parallel
				const [movie, trailers] = await Promise.all([fetchStreamDetails(`movie/${id}`), fetchStreamDetails(`movie/${id}/videos`)]);

				// Set the movie details and trailers in the states
				setMovie(movie);
				setMovieTrailers(trailers.results.slice(0, 2) || []);
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
	}, [id]);

	// Loading state for Movie details
	if (loading) {
		return <Spinner />;
	}

	// Error state for Movie details
	if (error) {
		return <Error />;
	}

	if (!movie) {
		return <Error />;
	}

	return (
		<div className="relative min-h-screen overflow-hidden">
			<div className="relative z-10 p-4 pt-0 md:pt-4">
				<div className="grid grid-cols-12 w-full h-full gap-x-6 lg:gap-y-16 max-w-7xl mx-auto">
					{/* Movie poster */}
					<div className="col-span-12 md:col-span-4 mx-auto">
						<a href={movie.homepage || "#"} target="_blank" rel="noopener noreferrer" className="p-4">
							<img className="w-full h-auto object-cover" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
						</a>
					</div>

					{/* Movie details */}
					<div className="col-span-12 md:col-span-8 p-4 text-black dark:text-white/80">
						{/* Movie title */}
						<a
							href={movie.homepage || "#"}
							target="_blank"
							rel="noopener noreferrer"
							className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black dark:text-white"
						>
							{movie.title}
						</a>

						{/* Movie rating */}
						<RatingStars voteAverage={movie.vote_average} voteCount={movie.vote_count} />

						{/* Movie description */}
						<p className="text-lg text-black dark:text-white/80 mb-4">{movie.overview}</p>

						{/* Movie original title */}
						<div className="mb-1">
							<span className="font-semibold mr-2 text-[#A2C900]">Titre original :</span> {movie.original_title}
						</div>

						{/* Movie release date*/}
						<div className="mb-1">
							<span className="font-semibold mr-2 text-[#A2C900]">Date de sortie :</span> {dateFormatted(movie.release_date)}
						</div>

						{/* Movie runtime */}
						<div className="mb-1">
							<span className="font-semibold mr-2 text-[#A2C900]">Durée :</span> {runtimeFormatted(movie.runtime)}
						</div>

						{/* Movie genres */}
						<div className="mb-3">
							<span className="font-semibold mr-2 text-[#A2C900]">Genres :</span> {movie.genres.map((genre) => genre.name).join(", ")}
						</div>

						<hr className="mt-5 mb-4 border-[#A2C900]/30" />

						{/* Movie production companies */}
						<div className="mb-2">
							<span className="font-semibold mr-2 text-[#A2C900]">Production Companies :</span>{" "}
							{movie.production_companies
								.slice(0, 3)
								.map((company) => company.name)
								.join(", ")}
						</div>

						{/* Movie budget*/}
						<div className="mb-1">
							<span className="font-semibold mr-2 text-[#A2C900]">Coût de production :</span>{" "}
							{movie.budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}
						</div>

						{/*  */}
						<div className="mb-3">
							<span className="font-semibold mr-2 text-[#A2C900]">Revenus :</span>{" "}
							{movie.revenue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
						</div>

						{/* IMDB link */}
						<a
							href={`https://www.imdb.com/title/${movie.imdb_id}`}
							target="_blank"
							rel="noopener noreferrer"
							className="mb-3 w-fit block"
							title="Voir sur IMDB"
						>
							<FaImdb className="text-[#E2B616] text-5xl" />
						</a>
					</div>

					{/* Trailers player */}
					{movieTrailers.length > 0 && (
						<div className="col-span-12 w-full h-full md:my-14">
							<TrailersPlayer trailers={movieTrailers} />
						</div>
					)}

					{/* Recommendations */}
					<div className="col-span-12 w-full h-full my-14">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-10 uppercase">Vos Recommandations</h2>
						<TopTenStreams endpoint={`movie/${id}/recommendations`} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetails;
