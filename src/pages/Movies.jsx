import { Button } from "@/components/ui/button";
import Featured from "@/components/Featured";
import TopStreams from "@/components/TopStreams";

const Movies = () => {
	// Title for the featured section
	const featuredTitle = (
		<>
			Films <span className="text-[#A2C900] font-black">les mieux notés</span>
		</>
	);

	return (
		<main>
			{/* Featured section with best movies of all time */}
			<Featured endpoint={"movie/top_rated?language=fr-FR&page=1&region=CA"} title={featuredTitle} />

			{/* Top action and adventure movies */}
			<div className="w-full">
				<h3 className="text-base md:text-2xl lg:text-4xl font-semibold mt-14 mb-6 uppercase lg:ml-[5vw] flex items-center justify-center gap-1 lg:gap-4">
					Films <span className="text-[#A2C900] font-black">d'action et d'aventure</span>
				</h3>
				<TopStreams endpoint="discover/movie?sort_by=popularity.desc&with_genres=28|12&primary_release_date.gte=2023-01-01&region=CA&watch_region=CA&with_watch_providers=8&with_original_language=en&without_genres=16|10751|14|878&region=US" />
			</div>

			{/* Top science-fiction movies */}
			<div className="w-full">
				<h3 className="text-base md:text-2xl lg:text-4xl font-semibold mt-14 mb-6 uppercase lg:ml-[5vw] flex items-center justify-center gap-1 lg:gap-4">
					Films <span className="text-[#A2C900] font-black">de science-fiction</span>
				</h3>
				<TopStreams endpoint="discover/movie?sort_by=popularity.desc&with_genres=878&primary_release_date.gte=2023-01-01&region=CA&watch_region=CA&with_watch_providers=8&with_original_language=en&without_genres=16|10751|14&region=US" />
			</div>

			{/* Top fantasy movies */}
			<div className="w-full">
				<h3 className="text-base md:text-2xl lg:text-4xl font-semibold mt-14 mb-6 uppercase lg:ml-[5vw] flex items-center justify-center gap-1 lg:gap-4">
					Films <span className="text-[#A2C900] font-black">fantastiques</span>
				</h3>
				<TopStreams endpoint="discover/movie?sort_by=popularity.desc&with_genres=14&primary_release_date.gte=2023-01-01&region=CA&watch_region=CA&with_watch_providers=8&with_original_language=en&without_genres=16&region=US" />
			</div>

			{/* Top comedy movies */}
			<div className="w-full">
				<h3 className="text-base md:text-2xl lg:text-4xl font-semibold mt-14 mb-6 uppercase lg:ml-[5vw] flex items-center justify-center gap-1 lg:gap-4">
					Films <span className="text-[#A2C900] font-black">comédies</span>
				</h3>
				<TopStreams endpoint="discover/movie?sort_by=popularity.desc&with_genres=34|10751&primary_release_date.gte=2023-01-01&region=CA&watch_region=CA&with_watch_providers=8&with_original_language=en&without_genres=16|14&region=US" />
			</div>
		</main>
	);
};

export default Movies;
