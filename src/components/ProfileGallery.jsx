import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ProfileGallery = ({ images }) => {
	// Ref for the carousel plugin to control the autoplay
	const plugin = useRef(
		Autoplay({
			delay: 3000, // Set delay for autoplay
			stopOnInteraction: false, // Continue autoplay even after user interaction
		})
	);

	return (
		<Carousel
			plugins={[
				// Initialize the Autoplay and Fade plugins
				plugin.current,
				Fade(),
			]}
			className="w-full h-full"
			// Pause autoplay on mouse over
			onMouseEnter={() => plugin.current.stop()}
			onMouseLeave={() => plugin.current.reset()}
		>
			<CarouselContent>
				{/* Map through the images and create a carousel item for each image */}
				{images.map((image, index) => (
					<CarouselItem key={index}>
						<img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt="Photo de profil" className="w-full h-full object-cover" />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};

export default ProfileGallery;
