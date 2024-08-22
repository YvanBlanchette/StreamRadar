import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { NextButton, PrevButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { fetchTrendingMoviesAndTvShows } from "@/actions/getActions";

const EmblaCarousel = (props) => {
	const [trending, setTrending] = useState([]);

	useEffect(() => {
		const loadMovies = async () => {
			try {
				const moviesAndTvShows = await fetchTrendingMoviesAndTvShows("trending/all/week");
				// Set the state with the fetched data
				setTrending(moviesAndTvShows);
				console.log(moviesAndTvShows);
			} catch (error) {
				// Handle errors
				console.error(error);
			}
		};

		loadMovies();
	}, []);

	const { options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		AutoScroll({ playOnInit: true, stopOnMouseEnter: true, stopOnInteraction: false, startDelay: 0, speed: 0.8, direction: "forward" }),
	]);
	const [isPlaying, setIsPlaying] = useState(true);

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

	const onButtonAutoplayClick = useCallback(
		(callback) => {
			const autoScroll = emblaApi?.plugins()?.autoScroll;
			if (!autoScroll) return;

			const resetOrStop = autoScroll.options.stopOnInteraction === false ? autoScroll.reset : autoScroll.stop;

			resetOrStop();
			callback();
		},
		[emblaApi]
	);

	useEffect(() => {
		const autoScroll = emblaApi?.plugins()?.autoScroll;
		if (!autoScroll) return;

		setIsPlaying(autoScroll.isPlaying());
		emblaApi
			.on("autoScroll:play", () => setIsPlaying(true))
			.on("autoScroll:stop", () => setIsPlaying(false))
			.on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
	}, [emblaApi]);

	return (
		<div className="relative embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{trending.map((stream) => (
						<Dialog key={stream.id}>
							<DialogTrigger className="embla__slide">
								<div className="embla__slide__inner  group">
									<img src={`https://image.tmdb.org/t/p/w500/${stream.poster_path}`} className="embla__slide__img relative h-full" alt={stream.title} />
									<div className="absolute px-2 w-16 h-16 z-50 top-0 right-0 text-xl font-bold bg-gradient-to-bl from-[#47C300]/80 to-[#A2C900]/80 rounded-bl-3xl flex flex-col items-center justify-center">
										<span className="text-xs text-center">{stream.media_type === "tv" ? "Série TV" : "Film"}</span>
										{stream.vote_average.toFixed(1)}
									</div>
								</div>
							</DialogTrigger>
							<DialogContent className="p-0 bg-[#0F1523]">
								<div className="flex">
									<img src={`https://image.tmdb.org/t/p/w500/${stream.poster_path}`} alt={stream.name} className="w-[300px] mx-auto" />
									<div className="px-8 pt-2 flex flex-col">
										<DialogTitle className="text-center text-3xl mb-2 tracking-wide">{stream.media_type === "tv" ? stream.name : stream.title}</DialogTitle>
										<DialogDescription className="text-gray-400 text-justify text-base mb-6">{stream.overview}</DialogDescription>
										<p className="text-[#A2C900] font-bold mb-1">
											<span className="text-gray-400 font-bold">{stream.media_type === "tv" ? "Date de première diffusion:" : "Date de sortie:"}</span>{" "}
											{stream.media_type === "tv" ? stream.first_air_date : stream.release_date}
										</p>
										<p className="text-[#A2C900] font-bold mb-6 text-lg">
											<span className="text-gray-400 font-bold text-base">Note:</span> {stream.vote_average.toFixed(1)} / 10
										</p>

										<a
											href={`${stream.media_type === "tv" ? "tv" : "movie"}/${stream.id}`}
											className="bg-[#A2C900] text-white flex items-center justify-center hover:opacity-80 font-bold py-2 px-4 mb-6 uppercase transition-all duration-300"
										>
											Plus de détails
										</a>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					))}
				</div>
			</div>

			{/* <div className="embla__controls">
				<div className="embla__buttons">
					<PrevButton
						onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
						disabled={prevBtnDisabled}
						className="absolute top-[50%] -left-16 -translate-y-[50%] -translate-x- h-[80%] group-hover:opacity-100 opacity-20 transition-opacity duration-300"
					/>
					<NextButton
						onClick={() => onButtonAutoplayClick(onNextButtonClick)}
						disabled={nextBtnDisabled}
						className="absolute top-[50%] -right-[9%] -translate-y-[50%] -translate-x- h-[80%] group-hover:opacity-100 opacity-20 transition-opacity duration-300"
					/>
				</div>
			</div> */}
		</div>
	);
};

export default EmblaCarousel;
