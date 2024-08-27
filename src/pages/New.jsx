import { useMemo } from "react";
import TopStreams from "@/components/TopStreams";
import Featured from "@/components/Featured";
import { providers } from "@/data/constants";

const New = () => {
	// Title of the featured section
	const featuredTitle = (
		<>
			Présentement <span className="text-[#A2C900] font-black">à l'affiche</span>
		</>
	);

	// Get the endpoint for each providers
	const getEndpoint = (providerId) =>
		`discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&region=CA&sort_by=primary_release_date.desc&vote_average.gte=3&watch_region=CA&with_original_language=fr%7Cen&with_watch_providers=${providerId}`;

	return (
		<main>
			{/* Featured section with the newest movies */}
			<Featured
				endpoint="discover/movie?include_adult=false&include_video=true&language=fr-FR&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}"
				title={featuredTitle}
			/>

			<div className="w-full min-h-[600px]">
				{providers.map((provider) => (
					<section key={provider.provider_id} id={provider.provider_name}>
						{/* Title of the section with the logo of the provider */}
						<h3 className="text-base md:text-2xl lg:text-4xl font-semibold mt-14 mb-6 uppercase lg:ml-[5vw] flex items-center justify-center gap-1 lg:gap-4">
							<span className="text-[#A2C900] font-black">Nouveautées</span> sur {provider.provider_name}{" "}
							<img
								src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
								alt={`Logo de ${provider.provider_name}`}
								title={provider.provider_name}
								className="rounded-xl w-16 h-16 shadow dark:shadow-white/30"
							/>
						</h3>
						{/* Carousel with the top new movies from each providers */}
						<TopStreams endpoint={getEndpoint(provider.provider_id)} />
					</section>
				))}
			</div>
		</main>
	);
};

export default New;
