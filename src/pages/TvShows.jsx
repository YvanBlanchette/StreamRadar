import Featured from "@/components/Featured";
import TopStreams from "@/components/TopStreams";

const TvShows = () => {
	const featuredTitle = (
		<>
			Les Séries Tv <span className="text-[#A2C900] font-black">les mieux notés</span>
		</>
	);

	return (
		<main>
			{/* Featured section with top-rated TV shows */}
			<Featured
				endpoint={
					"discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc&vote_average.gte=3.402823669209385&vote_count.gte=3000&watch_region=CA&with_original_language=en"
				}
				title={featuredTitle}
			/>

			{/* Top action and adventure TV shows */}
			<div className="w-full">
				<h3 className="text-base md:text-2xl lg:text-4xl font-semibold mt-14 mb-6 uppercase lg:ml-[5vw] flex items-center justify-center gap-1 lg:gap-4">
					Séries Tv <span className="text-[#A2C900] font-black">d'action & d'aventure</span>
				</h3>
				<TopStreams endpoint="discover/tv?sort_by=popularity.desc&with_genres=10759&primary_release_date.gte=2023-01-01&region=CA&watch_region=CA&with_watch_providers=8&with_original_language=en&region=US&without_genres=10765|16" />
			</div>

			{/* Top science fiction and fantasy TV shows */}
			<div className="w-full">
				<h3 className="text-base md:text-2xl lg:text-4xl font-semibold mt-14 mb-6 uppercase lg:ml-[5vw] flex items-center justify-center gap-1 lg:gap-4">
					Séries Tv <span className="text-[#A2C900] font-black">fantastiques & science-fiction</span>
				</h3>
				<TopStreams endpoint="discover/tv?sort_by=popularity.desc&with_genres=10765&primary_release_date.gte=2023-01-01&region=CA&watch_region=CA&with_watch_providers=8&with_original_language=en&without_genres=16|10751&region=US" />
			</div>

			{/* Top documentary TV shows */}
			<div className="w-full">
				<h3 className="text-base md:text-2xl lg:text-4xl font-semibold mt-14 mb-6 uppercase lg:ml-[5vw] flex items-center justify-center gap-1 lg:gap-4">
					Séries Tv <span className="text-[#A2C900] font-black">documentaires</span>
				</h3>
				<TopStreams endpoint="discover/tv?sort_by=popularity.desc&with_genres=99&primary_release_date.gte=2023-01-01&region=CA&watch_region=CA&with_watch_providers=8&with_original_language=en&without_genres=16&region=US" />
			</div>

			{/* Top comedy TV shows */}
			<div className="w-full">
				<h3 className="text-base md:text-2xl lg:text-4xl font-semibold mt-14 mb-6 uppercase lg:ml-[5vw] flex items-center justify-center gap-1 lg:gap-4">
					Séries Tv <span className="text-[#A2C900] font-black"> comédies </span>
				</h3>
				<TopStreams endpoint="discover/tv?sort_by=popularity.desc&with_genres=35&primary_release_date.gte=2023-01-01&region=CA&watch_region=CA&with_watch_providers=8&with_original_language=en&without_genres=16&region=US" />
			</div>
		</main>
	);
};

export default TvShows;
