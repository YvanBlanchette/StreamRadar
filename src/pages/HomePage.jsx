import EmblaCarousel from "@/components/EmblaCarousel";
import TopStreams from "@/components/TopStreams";

// Options for the EmblaCarousel
const OPTIONS = { loop: true };

const Homepage = () => {
	return (
		<div>
			{/* Section for trending content */}
			<div className="relative w-screen h-full flex flex-col justify-center mb-5">
				<h2 className="mt-8 mb-6 text-center lg:text-start lg:ml-[75px] text-xl md:text-2xl lg:text-3xl font-semibold uppercase">
					Les plus <span className="font-black text-[#A2C900]">populaires</span> du moment
				</h2>
				{/* EmblaCarousel component to display trending items */}
				<EmblaCarousel options={OPTIONS} endpoint="trending/all/week" />
			</div>

			{/* Section for top TV series */}
			<div className="relative w-screen h-full flex flex-col justify-center my-5">
				<h2 className="mt-8 mb-6 text-center lg:text-start lg:ml-[75px] text-xl md:text-2xl lg:text-3xl font-semibold uppercase">
					Top 10 <span className="font-black text-[#A2C900]">Séries TV</span> de la Semaine
				</h2>
				{/* TopStreams component to display top TV series */}
				<TopStreams endpoint="trending/tv/week" />
			</div>

			{/* Section for top movies */}
			<div className="relative w-screen h-full flex flex-col justify-center my-5">
				<h2 className="mt-8 mb-6 text-center lg:text-start lg:ml-[75px] text-xl md:text-2xl lg:text-3xl font-semibold uppercase">
					Top 10 <span className="font-black text-[#A2C900]">Films</span> de la Semaine
				</h2>
				{/* TopStreams component to display top movies */}
				<TopStreams endpoint="trending/movie/week" />
			</div>
		</div>
	);
};

export default Homepage;
