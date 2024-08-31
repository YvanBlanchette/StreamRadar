import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaImdb } from "react-icons/fa";
import { fetchDetails } from "@/actions/getActions";
import { runtimeFormatted, dateFormatted } from "@/lib/utils";
import RatingStars from "@/components/RatingStars";
import TrailersPlayer from "@/components/TrailersPlayer";
import TopStreams from "@/components/TopStreams";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import Cast from "@/components/Cast";

const MovieDetails = () => {
	// Extract movie ID from URL parameters
	const { id } = useParams();

	// State variables to hold movie details, trailers, credits, and loading/error status
	const [movie, setMovie] = useState(null);
	const [movieTrailers, setMovieTrailers] = useState([]);
	const [credits, setCredits] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Function to fetch movie details, trailers, and credits
		const fetchData = async () => {
			try {
				setLoading(true); // Show loading spinner

				// Fetch movie details, trailers, and credits in parallel
				const [movie, trailers, credits] = await Promise.all([
					fetchDetails(`movie/${id}`),
					fetchDetails(`movie/${id}/videos`),
					fetchDetails(`movie/${id}/credits`),
				]);

				// Update state with fetched data
				setMovie(movie);
				// Set the first three trailers
				setMovieTrailers(trailers.results.slice(0, 3) || []);
				// Set only the first 20 cast members
				setCredits(credits.cast.slice(0, 20) || []);
			} catch (error) {
				// Set error message
				setError("Une erreur est survenue lors du chargement des films.");
				console.error(error);
			} finally {
				// Hide loading spinner
				setLoading(false);
			}
		};
		// Fetch data when component mounts
		fetchData();
	}, [id]);

	// Show the spinner while loading
	if (loading) {
		return <Spinner />;
	}

	// Return error component if there is an error or movie data is missing
	if (error || !movie) {
		return <Error />;
	}

	return (
		<div className="relative min-h-screen overflow-hidden">
			<div className="relative z-10 p-4 pt-0 md:pt-4">
				<div className="grid grid-cols-12 w-full h-full gap-x-6 lg:gap-y-16 max-w-7xl mx-auto">
					{/* Movie poster */}
					<div className="col-span-12 md:col-span-4 mx-auto">
						<a href={movie.homepage || "#"} target="_blank" rel="noopener noreferrer" className="p-4">
							<img
								className="w-full h-auto object-cover"
								src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `/assets/images/no-image.jpg`}
								alt={movie.title}
							/>
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

						{/* Movie release date */}
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

						{/* Movie budget */}
						<div className="mb-1">
							<span className="font-semibold mr-2 text-[#A2C900]">Coût de production :</span>{" "}
							{movie.budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}
						</div>

						{/* Movie revenue */}
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
						<div className="col-span-12 w-full h-full my-7">
							<h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 uppercase">Bande-Annonces</h2>
							<div className="col-span-12 w-full h-full">
								<TrailersPlayer trailers={movieTrailers} />
							</div>
						</div>
					)}

					{/* Cast */}
					{credits.length > 0 && (
						<div className="col-span-12 w-full h-full my-7">
							<h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 uppercase">Distribution</h2>
							<div className="col-span-12 w-full h-full">
								<Cast credits={credits} />
							</div>
						</div>
					)}

					{/* Recommendations */}
					<div className="col-span-12 w-full h-full mb-14">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-10 uppercase">Vos Recommandations</h2>
						<TopStreams endpoint={`movie/${id}/recommendations`} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetails;
