import { useParams } from "react-router-dom";
import { fetchStreamDetails } from "@/actions/getActions";
import { useEffect, useState } from "react";

const MovieDetails = () => {
	// Extract the 'id' from the URL
	const { id } = useParams();

	// State to hold the movie data
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadMovie = async () => {
			try {
				const movie = await fetchStreamDetails(`movie/${id}`);
				// Set the state with the fetched data
				setMovie(movie);
				console.log(movie);
			} catch (error) {
				// Handle errors
				console.error(error);
				setError("Failed to load movie details.");
			}
		};

		loadMovie();
	}, [id]); // Add `id` as a dependency to the effect

	return (
		<div className="relative h-screen overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-center -z-[1] bg-no-repeat w-[100vw] h-[100vh]"
				style={{
					backgroundImage: movie?.backdrop_path ? `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})` : `url('fallback-image-url')`,
					opacity: 0.1, // Adjust the opacity here
				}}
			></div>
			<div className="relative z-10 p-4 ">
				{error ? (
					<p className="text-red-500">{error}</p>
				) : movie ? (
					<div>
						{/* Render movie details */}
						<h1 className="text-3xl font-bold text-white">{movie.title}</h1>
						<p className="text-lg text-white">{movie.overview}</p>
						{/* Other movie details here */}
					</div>
				) : (
					<p className="text-white">Loading...</p>
				)}
			</div>
		</div>
	);
};

export default MovieDetails;
