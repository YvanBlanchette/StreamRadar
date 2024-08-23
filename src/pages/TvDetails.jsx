import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStreamDetails } from "@/actions/getActions";
import { dateFormatted } from "@/lib/utils";
import RatingStars from "@/components/RatingStars";
import TrailersPlayer from "@/components/TrailersPlayer";
import TopTenStreams from "@/components/ui/TopTenStreams";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";

const TvShowDetails = () => {
	const { id } = useParams();
	const [tvShow, setTvShow] = useState(null);
	const [tvShowTrailers, setTvShowTrailers] = useState([]);
	const [tvShowCredits, setTvShowCredits] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch the TV show details, trailers, and credits
		const fetchData = async () => {
			try {
				// Set loading state to true to show the spinner while fetching the data
				setLoading(true);

				// Fetching of the TV show details, trailers, and credits in parallel
				const [tvShow, trailers, credits] = await Promise.all([
					fetchStreamDetails(`tv/${id}`),
					fetchStreamDetails(`tv/${id}/videos`),
					fetchStreamDetails(`tv/${id}/credits`),
				]);

				// Set the TV show details, trailers, and credits in the states
				setTvShow(tvShow);
				setTvShowTrailers(trailers.results.slice(0, 2) || []);
				setTvShowCredits(credits || []);
				console.log(tvShow);
				console.log(trailers.results);
				console.log(credits);
			} catch (error) {
				// Handle errors
				setError("Failed to fetch data.");
				console.error(error);
			} finally {
				// Set loading state to false to hide the spinner
				setLoading(false);
			}
		};

		// Call the fetchData function
		fetchData();
	}, [id]);

	// Loading state for TV show details
	if (loading) {
		return <Spinner />;
	}

	// Error state for TV show details
	if (error) {
		return <Error />;
	}

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

							{/* Tv show nmbre of seasons */}
							<div className="mb-1">
								<span className="font-semibold mr-2 text-[#A2C900]">Nombre de saisons :</span> {tvShow.number_of_seasons}
							</div>

							{/* Tv show nmbre of episodes */}
							<div className="mb-1">
								<span className="font-semibold mr-2 text-[#A2C900]">Nombre d'épisodes :</span> {tvShow.number_of_episodes}
							</div>

							{/* Tv show status */}
							<div className="mb-1">
								<span className="font-semibold mr-2 text-[#A2C900]">Statut :</span> {tvShow.status === "Returning Series" ? "En cours..." : "Terminé"}
							</div>

							<hr className="mt-5 mb-4 border-[#A2C900]/30" />

							{/* Tv show production companies */}
							<div className="mb-2">
								<span className="font-semibold mr-2 text-[#A2C900]">Production Companies :</span>{" "}
								{tvShow.production_companies
									.slice(0, 3)
									.map((company) => company.name)
									.join(", ")}
							</div>

							{/* Tv show cast */}
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
							<div className="col-span-12 w-full h-full lg:my-14">
								<TrailersPlayer trailers={tvShowTrailers} />
							</div>
						)}

						<div className="col-span-12 w-full h-full my-14">
							<h2 className="text-5xl font-semibold text-center mb-10 uppercase">Vos Recommandations</h2>
							{/* <TopTenStreams endpoint={`tvShow/${id}/recommendations`} /> */}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TvShowDetails;
