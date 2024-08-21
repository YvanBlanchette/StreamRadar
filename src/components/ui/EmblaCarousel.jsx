import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { NextButton, PrevButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { getPopularMovies } from "@/actions/getActions";

const EmblaCarousel = (props) => {
	const [popularMovies, setPopularMovies] = useState([]);

	useEffect(() => {
		const loadMovies = async () => {
			try {
				const movies = await getPopularMovies();
				// Set the state with the fetched data
				setPopularMovies(movies.results);
				console.log(popularMovies.results);
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
					{popularMovies.map((movie) => (
						<div className="embla__slide" key={movie.id}>
							<a href={`movie-details.php?id=${movie.id}`} className="embla__slide__inner  group">
								<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="embla__slide__img relative h-full" alt={movie.title} />
								<div className="absolute px-2 w-16 h-16 z-50 top-0 right-0 text-xl font-bold bg-gradient-to-bl from-[#47C300]/80 to-[#A2C900]/80 rounded-bl-3xl flex items-center justify-center">
									{movie.vote_average.toFixed(1)}
								</div>
								<div className="absolute z-50 bottom-0 left-6 right-0 h-0 group-hover:h-[80%] text-xl font-bold bg-gradient-to-t from-black/90 to-black/70 transition-all duration-300 border-t-4 border-[#A2C900] border-double">
									<h2 className="text-center font-medium text-base mt-6 mb-2 uppercase">{movie.title}</h2>
									<p className="text-justify text-sm font-normal mx-4 text-ellipsis leading-tight text-shadow">{movie.overview}</p>
								</div>
							</a>
						</div>
					))}
				</div>
			</div>

			<div className="embla__controls">
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
			</div>
		</div>
	);
};

export default EmblaCarousel;
