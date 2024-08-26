import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ProfileGallery = ({ images }) => {
	// Create a ref for the carousel plugin instance to control autoplay
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
			// Pause autoplay on mouse enter and resume on mouse leave
			onMouseEnter={() => plugin.current.stop()}
			onMouseLeave={() => plugin.current.reset()}
		>
			<CarouselContent>
				{/* Map through the images and create a carousel item for each */}
				{images.map((image, index) => (
					<CarouselItem key={index}>
						<img
							src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
							alt="Photo de profil" // Alt text for accessibility
							className="w-full h-full object-cover" // Ensure images cover their containers
						/>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};

export default ProfileGallery;
