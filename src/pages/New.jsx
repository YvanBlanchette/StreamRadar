import { useEffect, useState } from "react";
import TopStreams from "@/components/ui/TopStreams";
import Featured from "@/components/Featured";
import { fetchWatchProviders } from "@/actions/getActions";
import { providers } from "@/data/constants";

const New = () => {
	const [watchProviders, setWatchProviders] = useState([]);
	const featuredTitle = (
		<>
			Présentement <span className="text-[#A2C900]">à l'affiche</span>
		</>
	);

	const today = new Date();
	const lastMonth = new Date(today);
	lastMonth.setMonth(today.getMonth() - 1);

	const formattedLastMonth = lastMonth.toISOString().split("T")[0];

	console.log(formattedLastMonth);

	return (
		<main>
			<Featured
				endpoint={
					"discover/movie?include_adult=false&include_video=true&language=fr-FR&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}"
				}
				title={featuredTitle}
			/>

			<div className="w-full min-h-[600px]">
				{providers.map((provider) => {
					const endpoint = `discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&region=CA&sort_by=primary_release_date.desc&vote_average.gte=3&watch_region=CA&with_original_language=fr%7Cen&with_watch_providers=${provider.provider_id}}`;

					return (
						<section key={provider.provider_id} id={provider.provider_name}>
							<h3 className="text-4xl font-semibold mt-14 mb-12 uppercase ml-[5vw] flex items-center gap-4">
								Les nouveaux films sur{" "}
								<img
									src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
									alt={`Logo de ${provider.provider_name}`}
									title={provider.provider_name}
									className="rounded-xl w-16 h-16"
								/>
							</h3>
							<TopStreams endpoint={endpoint} />
						</section>
					);
				})}
			</div>
		</main>
	);
};
export default New;
