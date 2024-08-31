import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

// Component to display cast in a carousel
const Cast = ({ credits }) => {
	return (
		<div className="w-full h-full">
			<Carousel
				// Carousel options
				opts={{
					align: "start",
					loop: true,
				}}
				className="w-full max-w-[90%] mx-auto"
			>
				<CarouselContent>
					{credits.map((cast) => (
						<CarouselItem key={cast.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
							<a href={`/cast/${cast.id}`}>
								<Card className="w-full text-center rounded-none bg-white text-black shadow-lg border-none group">
									<CardHeader className="w-full h-full p-0 overflow-hidden">
										{/* Display cast image */}
										<img
											src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
											alt={cast.name}
											className="w-full h-[300px] object-cover group-hover:scale-105 transition-all duration-300"
										/>
									</CardHeader>
									<div className="py-2 pb-3 px-2">
										{/* Display cast name */}
										<CardTitle className="pb-1 text-xl">{cast.name}</CardTitle>
										{/* Display cast character name*/}
										<CardDescription className="text-xs">{cast.character}</CardDescription>
									</div>
								</Card>
							</a>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* Navigation controls for the carousel */}
				<CarouselPrevious className="hidden md:block -translate-x-6" />
				<CarouselNext className="hidden md:block translate-x-6" />
			</Carousel>
		</div>
	);
};

export default Cast;
