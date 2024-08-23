import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { fetchTenPopulars } from "@/actions/getActions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const TopTenStreams = ({ endpoint }) => {
	const [tvShows, setTvShows] = useState([]);

	useEffect(() => {
		const loadTvShows = async () => {
			try {
				const results = await fetchTenPopulars(endpoint);
				// Set the state with the fetched data
				setTvShows(results);
			} catch (error) {
				// Handle errors
				console.error(error);
			}
		};

		loadTvShows();
	}, []);

	return (
		<div>
			<Carousel
				opts={{
					align: "start",
					loop: true,
				}}
				className="w-full max-w-[90%] mx-auto"
			>
				<CarouselContent>
					{tvShows.map((stream, index) => (
						<CarouselItem key={stream.id} className="md:basis-1/2 lg:basis-1/5">
							<Dialog>
								<Card className="bg-transparent border-none shadow-none">
									<CardContent className="relative flex items-center justify-center">
										<DialogTrigger>
											<img src={`https://image.tmdb.org/t/p/w500/${stream.poster_path}`} className="w-full shadow-md shadow-black/50" alt={stream.name} />
										</DialogTrigger>

										<DialogContent
											aria-describedby={stream.name}
											className="p-0 w-full h-full overflow-y-scroll md:w-[inherit] md:h-[inherit] pt-10 md:pt-0 bg-black md:shadow-lg dark:shadow-[#A2C900]/30"
										>
											<div className="flex flex-col md:flex-row">
												<img src={`https://image.tmdb.org/t/p/w500/${stream.poster_path}`} alt={stream.name} className="w-[300px] mx-auto object-cover" />
												<div className="px-8 flex flex-col">
													<DialogTitle className="text-center text-2xl mb-2">{stream.media_type === "tv" ? stream.name : stream.title}</DialogTitle>
													<DialogDescription className="text-gray-400 text-justify text-base mb-6">{stream.overview}</DialogDescription>
													<p className="text-[#A2C900] font-bold mb-1">
														<span className="text-gray-400 font-bold">Date de première diffusion:</span> {stream.first_air_date}
													</p>
													<p className="text-[#A2C900] font-bold mb-6 text-lg">
														<span className="text-gray-400 font-bold text-base">Note:</span> {stream.vote_average.toFixed(1)} / 10
													</p>

													<a
														href={`/${stream.media_type === "tv" ? "tv" : "movie"}/${stream.id}`}
														className="bg-[#A2C900] text-white flex items-center justify-center hover:opacity-80 font-bold py-2 px-4 mb-6 uppercase transition-all duration-300"
													>
														Plus de détails
													</a>
												</div>
											</div>
										</DialogContent>
									</CardContent>
								</Card>
							</Dialog>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="hidden md:block" />
				<CarouselNext className="hidden md:block" />
			</Carousel>
		</div>
	);
};
export default TopTenStreams;
