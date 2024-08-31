import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaImdb } from "react-icons/fa";
import { fetchDetails } from "@/actions/getActions";
import { runtimeFormatted, dateFormatted } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import Cast from "@/components/Cast";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa6";
import ProfileGallery from "@/components/ProfileGallery";

const CastDetails = () => {
	// Get the Cast id from the URL params
	const { id } = useParams();

	// State to store the cast details
	const [cast, setCast] = useState(null);

	// Loading state for fetching cast details
	const [loading, setLoading] = useState(true);

	// Error state for handling any fetch errors
	const [error, setError] = useState(null);

	useEffect(() => {
		// Function to fetch cast details
		const fetchData = async () => {
			try {
				// Set loading state to true to display spinner
				setLoading(true);

				// Fetching cast details from API
				const results = await fetchDetails(`person/${id}?append_to_response=combined_credits%2Cexternal_ids%2Cimages&language=en-US`);

				// Set the fetched cast details to state
				setCast(results);
			} catch (error) {
				// Set error state if there is an issue with fetching data
				setError(error);
				console.error(error); // Log error for debugging
			} finally {
				// Set loading state to false once data fetching is complete
				setLoading(false);
			}
		};

		// Call fetchData function to load cast details
		fetchData();
	}, [id]);

	// Display spinner while data is being fetched
	if (loading) {
		return <Spinner />;
	}

	// Display error component if there was an error fetching data
	if (error) {
		return <Error />;
	}

	// Display error component if cast data is not available
	if (!cast) {
		return <Error />;
	}

	return (
		<div className="relative min-h-screen overflow-hidden">
			<div className="relative z-10 p-4 pt-0 md:pt-12">
				<div className="grid grid-cols-12 w-full h-full gap-x-6 lg:gap-y-16 max-w-7xl mx-auto">
					{/* Cast Picture */}
					<div className="col-span-12 md:col-span-4 mx-auto">
						<a href={cast.homepage || "#"} target="_blank" rel="noopener noreferrer" className="p-4">
							<ProfileGallery images={cast.images.profiles} />
						</a>
					</div>

					{/* Cast Details */}
					<div className="col-span-12 md:col-span-8 p-4 text-black dark:text-white/80">
						{/* Cast Name */}
						<a
							href={cast.homepage || "#"}
							target="_blank"
							rel="noopener noreferrer"
							className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black dark:text-white"
						>
							{cast.name}
						</a>

						{/* Cast Biography */}
						<p className="text-lg text-black dark:text-white/80 my-4">{cast.biography}</p>

						{/* Cast Gender */}
						<div className="mb-1">
							<span className="font-semibold mr-2 text-[#A2C900]">Sexe :</span> {cast.gender === 2 ? "Homme" : cast.gender === 1 ? "Femme" : "Autre"}
						</div>

						{/* Cast Birthday */}
						<div className="mb-1">
							<span className="font-semibold mr-2 text-[#A2C900]">Date de naissance :</span> {dateFormatted(cast.birthday)}
						</div>

						{/* Cast Place of Birth */}
						<div className="mb-1">
							<span className="font-semibold mr-2 text-[#A2C900]">Lieu de naissance :</span> {cast.place_of_birth}
						</div>

						<hr className="mt-5 mb-4 border-[#A2C900]/30" />

						{/* External Links */}
						<div className="flex flex-wrap gap-3">
							{/* Facebook */}
							{cast.external_ids.facebook_id && (
								<a
									href={`https://facebook.com/${cast.external_ids.facebook_id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="mb-3 w-fit block"
									title="Voir sur Facebook"
									aria-label={`Facebook profile of ${cast.name}`}
								>
									<FaFacebook className="text-[#A2C900] text-4xl" />
								</a>
							)}

							{/* Instagram */}
							{cast.external_ids.instagram_id && (
								<a
									href={`https://instagram.com/${cast.external_ids.instagram_id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="mb-3 w-fit block"
									title="Voir sur Instagram"
									aria-label={`Instagram profile of ${cast.name}`}
								>
									<FaInstagram className="text-[#A2C900] text-4xl" />
								</a>
							)}

							{/* Tiktok */}
							{cast.external_ids.tiktok_id && (
								<a
									href={`https://www.tiktok.com/@${cast.external_ids.tiktok_id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="mb-3 w-fit block"
									title="Voir sur Tiktok"
									aria-label={`Tiktok profile of ${cast.name}`}
								>
									<FaTiktok className="text-[#A2C900] text-4xl" />
								</a>
							)}

							{/* Twitter */}
							{cast.external_ids.twitter_id && (
								<a
									href={`https://www.twitter.com/${cast.external_ids.twitter_id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="mb-3 w-fit block"
									title="Voir sur Twitter"
									aria-label={`Twitter profile of ${cast.name}`}
								>
									<FaTwitter className="text-[#A2C900] text-4xl" />
								</a>
							)}

							{/* Youtube */}
							{cast.external_ids.youtube_id && (
								<a
									href={`https://www.youtube.com/@${cast.external_ids.youtube_id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="mb-3 w-fit block"
									title="Voir sur Youtube"
									aria-label={`Youtube profile of ${cast.name}`}
								>
									<FaYoutube className="text-[#A2C900] text-4xl" />
								</a>
							)}

							{/* IMDb */}
							{cast.external_ids.imdb_id && (
								<a
									href={`https://www.imdb.com/name/${cast.external_ids.imdb_id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="mb-3 w-fit block"
									title="Voir sur Imdb"
									aria-label={`IMDb profile of ${cast.name}`}
								>
									<FaImdb className="text-[#A2C900] text-4xl" />
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CastDetails;
