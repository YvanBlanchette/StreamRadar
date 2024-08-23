import EmblaCarousel from "@/components/ui/EmblaCarousel";
import TopTenStreams from "@/components/ui/TopTenStreams";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 20;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Homepage = () => {
	return (
		<div>
			<div className="relative w-screen h-full flex flex-col justify-center mb-5">
				<h2 className="mt-8 mb-6 text-center lg:text-start lg:ml-[75px] text-xl md:text-2xl lg:text-3xl font-semibold uppercase">
					Les plus <span className="font-black text-[#A2C900]">populaires</span> du moment
				</h2>
				<EmblaCarousel slides={SLIDES} options={OPTIONS} />
			</div>
			<div className="relative w-screen h-full flex flex-col justify-center my-5">
				<h2 className="mt-8 mb-6 text-center lg:text-start lg:ml-[75px] text-xl md:text-2xl lg:text-3xl font-semibold uppercase">
					Top 10 <span className="font-black text-[#A2C900]">Séries TV</span> de la Semaine
				</h2>
				<TopTenStreams endpoint="trending/tv/week" />
			</div>
			<div className="relative w-screen h-full flex flex-col justify-center my-5">
				<h2 className="mt-8 mb-6 text-center lg:text-start lg:ml-[75px] text-xl md:text-2xl lg:text-3xl font-semibold uppercase">
					Top 10 <span className="font-black text-[#A2C900]">Films</span> de la Semaine
				</h2>
				<TopTenStreams endpoint="trending/movie/week" />
			</div>
		</div>
	);
};
export default Homepage;
