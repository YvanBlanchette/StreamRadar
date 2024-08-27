import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetails } from "@/actions/getActions"; // Function to fetch TV show details, trailers, and credits
import { dateFormatted } from "@/lib/utils"; // Utility function to format dates
import RatingStars from "@/components/RatingStars"; // Component to display TV show ratings
import TrailersPlayer from "@/components/TrailersPlayer"; // Component to play trailers
import TopStreams from "@/components/TopStreams"; // Component to show recommended TV shows
import Spinner from "@/components/Spinner"; // Component to display a loading spinner
import Error from "@/components/Error"; // Component to display errors
import Cast from "@/components/Cast"; // Component to display cast information

const TvShowDetails = () => {
	const { id } = useParams(); // Extract the TV show ID from the URL parameters
	const [tvShow, setTvShow] = useState(null); // State to store TV show details
	const [tvShowTrailers, setTvShowTrailers] = useState([]); // State to store TV show trailers
	const [tvShowCredits, setTvShowCredits] = useState([]); // State to store TV show credits
	const [loading, setLoading] = useState(true); // State to manage loading state
	const [error, setError] = useState(null); // State to manage errors

	useEffect(() => {
		// Fetch TV show details, trailers, and credits
		const fetchData = async () => {
			try {
				setLoading(true); // Set loading to true while fetching data

				// Fetch TV show details, trailers, and credits in parallel
				const [tvShow, trailers, credits] = await Promise.all([fetchDetails(`tv/${id}`), fetchDetails(`tv/${id}/videos`), fetchDetails(`tv/${id}/credits`)]);

				setTvShow(tvShow); // Set TV show details
				setTvShowTrailers(trailers.results.slice(0, 2) || []); // Set up to 2 trailers
				setTvShowCredits(credits || []); // Set TV show credits
			} catch (error) {
				setError("Failed to fetch data."); // Set error message if fetching fails
				console.error(error); // Log the error
			} finally {
				setLoading(false); // Set loading to false after data is fetched
			}
		};

		fetchData(); // Call the fetchData function
	}, [id]); // Dependency array: re-fetch when `id` changes

	// Render loading spinner while data is being fetched
	if (loading) {
		return <Spinner />;
	}

	// Render error message if there is an error
	if (error) {
		return <Error />;
	}

	// Render error message if no TV show data is found
	if (!tvShow) {
		return <Error />;
	}

	return (
		<div className="relative min-h-screen overflow-hidden">
			<div className="relative z-10 p-4 pt-0 md:pt-4">
				{tvShow && (
					<div className="grid grid-cols-12 w-full h-full gap-x-6 lg:gap-y-16 max-w-7xl mx-auto">
						{/* TV show poster */}
						<div className="col-span-12 md:col-span-4 mx-auto">
							<a href={tvShow.homepage ? tvShow.homepage : "#"} target="_blank" className="p-4">
								<img className="w-full h-auto object-cover" src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={`${tvShow.name}`} />
							</a>
						</div>

						{/* TV show details */}
						<div className="col-span-12 md:col-span-8 p-4 text-black dark:text-white/80">
							{/* TV show name */}
							<a
								href={tvShow.homepage ? tvShow.homepage : "#"}
								target="_blank"
								className="text-2xl md:text-4xl lg:text-5xl font-semibold text-black dark:text-white"
							>
								{tvShow.name}
							</a>

							{/* TV show rating */}
							<RatingStars voteAverage={tvShow.vote_average} voteCount={tvShow.vote_count} />

							{/* TV show description */}
							<p className="text-lg text-black dark:text-white/80 mb-4">{tvShow.overview}</p>

							{/* TV show release date */}
							<div className="mb-1">
								<span className="font-semibold mr-2 text-[#A2C900]">Date de sortie :</span> {dateFormatted(tvShow.first_air_date)}
							</div>

							{/* TV show genres */}
							<div className="mb-1">
								<span className="font-semibold mr-2 text-[#A2C900]">Genres :</span> {tvShow.genres.map((genre) => genre.name).join(", ")}
							</div>

							{/* TV show creators */}
							{tvShow.created_by.length > 0 && (
								<div className="mb-1">
									<span className="font-semibold mr-2 text-[#A2C900]">Créé par :</span>
									{tvShow.created_by.map((creator) => creator.name).join(", ")}
								</div>
							)}

							{/* Number of seasons */}
							<div className="mb-1">
								<span className="font-semibold mr-2 text-[#A2C900]">Nombre de saisons :</span> {tvShow.number_of_seasons}
							</div>

							{/* Number of episodes */}
							<div className="mb-1">
								<span className="font-semibold mr-2 text-[#A2C900]">Nombre d'épisodes :</span> {tvShow.number_of_episodes}
							</div>

							{/* TV show status */}
							<div className="mb-1">
								<span className="font-semibold mr-2 text-[#A2C900]">Statut :</span> {tvShow.status === "Returning Series" ? "En cours..." : "Terminé"}
							</div>

							<hr className="mt-5 mb-4 border-[#A2C900]/30" />

							{/* Production companies */}
							<div className="mb-2">
								<span className="font-semibold mr-2 text-[#A2C900]">Production Companies :</span>{" "}
								{tvShow.production_companies
									.slice(0, 3)
									.map((company) => company.name)
									.join(", ")}
							</div>

							{/* Cast */}
							<div className="mb-1">
								<span className="font-semibold mr-2 text-[#A2C900]">Distribution :</span>
								{tvShowCredits.cast.slice(0, 5).map((cast) => (
									<p key={cast.id}>
										<span className="font-medium italic">{cast.name}</span> dans le rôle de {cast.character}
									</p>
								))}
							</div>
						</div>

						{/* Trailers player */}
						{tvShowTrailers.length > 0 && (
							<div className="col-span-12 w-full h-full my-7">
								<h2 className="text-4xl  md:text-5xl font-semibold text-center mb-10 uppercase">Bande-Annonces</h2>
								<div className="col-span-12 w-full h-full">
									<TrailersPlayer trailers={tvShowTrailers} />
								</div>
							</div>
						)}

						{/* Cast */}
						{tvShowCredits.cast.length > 0 && (
							<div className="col-span-12 w-full h-full my-7">
								<h2 className="text-4xl  md:text-5xl font-semibold text-center mb-10 uppercase">Distribution</h2>
								<div className="col-span-12 w-full h-full">
									<Cast credits={tvShowCredits.cast} />
								</div>
							</div>
						)}

						{/* Recommendations */}
						<div className="col-span-12 w-full h-full mb-14">
							<h2 className="text-5xl font-semibold text-center mb-10 uppercase">Vos Recommandations</h2>
							<TopStreams endpoint={`tv/${id}/recommendations`} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TvShowDetails;
