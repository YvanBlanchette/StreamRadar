import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import RatingStars from "./RatingStars";
import { cn } from "@/lib/utils";

const StreamCard = ({ stream }) => {
	return (
		<Dialog>
			<Card className="bg-transparent border-none shadow-none">
				<CardContent className="relative flex items-center justify-center">
					{/* Image that triggers the dialog modal to open */}
					<DialogTrigger>
						<img
							src={stream.poster_path ? `https://image.tmdb.org/t/p/w500/${stream.poster_path}` : `/assets/images/no-image.jpg`}
							className="min-w-[250px] max-w-[260px] h-[350px] shadow-md shadow-black/50"
							alt={stream.name}
						/>
					</DialogTrigger>

					{/* Modal content for stream details */}
					<DialogContent
						aria-describedby={stream.name}
						className="p-0 w-full h-full overflow-y-scroll md:overflow-y-hidden md:w-[inherit] md:h-[inherit] pt-10 md:pt-0 bg-black md:shadow-lg dark:shadow-[#A2C900]/30"
					>
						<div className="flex flex-col md:flex-row">
							{/* Stream poster in the modal */}
							<img
								src={stream.poster_path ? `https://image.tmdb.org/t/p/w500/${stream.poster_path}` : `/assets/images/no-image.jpg`}
								alt={stream.name}
								className="w-[300px] h-auto mx-auto object-cover"
							/>

							{/* Stream details */}
							<div className="px-8 flex flex-col">
								{/* Stream title with different font size based on the title length */}
								<DialogTitle
									className={cn(`text-center`, (stream.name && stream.name.length > 30) || (stream.title && stream.title.length > 30) ? "text-xl" : "text-2xl")}
								>
									{stream.media_type === "tv" ? stream.name : stream.title}
								</DialogTitle>

								{/* Stream description */}
								<DialogDescription className="text-gray-400 text-justify text-base mt-2 mb-6">{stream.overview}</DialogDescription>

								{/* Stream release date */}
								<p className="text-[#A2C900] font-bold mb-1">
									{stream.media_type === "tv" ? (
										<>
											<span className="text-gray-400 font-bold">Date de première diffusion:</span> {stream.first_air_date}
										</>
									) : (
										<>
											<span className="text-gray-400 font-bold">Date de sortie:</span> {stream.release_date}
										</>
									)}
								</p>

								{/* Stream rating */}
								<RatingStars voteAverage={stream.vote_average} voteCount={stream.vote_count} />

								{/* Button linking to detailed view */}
								<a
									href={`/${stream.first_air_date ? "tv" : "movie"}/${stream.id}`}
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
	);
};

export default StreamCard;
