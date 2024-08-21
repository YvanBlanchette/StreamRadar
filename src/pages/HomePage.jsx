import EmblaCarousel from "@/components/ui/EmblaCarousel";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 20;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Homepage = () => {
	return (
		<div>
			<div className="relative w-screen h-full flex flex-col justify-center">
				<h2 className="mt-8 mb-4 ml-[75px] text-3xl font-bold uppercase">
					Films les plus <span className="text-[#A2C900]">populaires</span> du moment
				</h2>
				<EmblaCarousel slides={SLIDES} options={OPTIONS} />
			</div>
			<div className="relative w-screen h-full flex flex-col justify-center">
				<h2 className="mt-8 mb-4 ml-[75px] text-3xl font-bold uppercase">
					Films les plus <span className="text-[#A2C900]">populaires</span> du moment
				</h2>
				<EmblaCarousel slides={SLIDES} options={OPTIONS} />
			</div>
		</div>
	);
};
export default Homepage;
