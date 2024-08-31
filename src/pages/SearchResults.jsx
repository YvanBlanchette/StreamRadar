import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchStreams } from "@/actions/getActions";
import StreamCard from "@/components/StreamCard";
import { cn } from "@/lib/utils";

const SearchResults = () => {
	// Extract queryTerm from the URL with useParams
	const { queryTerm } = useParams();

	// State to store the streams data
	const [streams, setStreams] = useState([]);

	useEffect(() => {
		// Function to fetch the streams data
		const fetchData = async () => {
			try {
				// Fetching the streams data
				const streams = await searchStreams(`search/multi?query=${encodeURIComponent(queryTerm)}&include_adult=true&language=fr-FR&page=1`);

				// Set the fetched streams data in the state
				setStreams(streams);
			} catch (error) {
				// Handle errors
				console.error(error);
			}
		};

		// If there is a queryTerm...
		if (queryTerm) {
			// Call the fetchData function
			fetchData();
		}
	}, [queryTerm]);

	return (
		<div className="w-full h-full">
			<h2 className="mt-12 mb-2 text-center text-3xl md:text-4xl lg:text-5xl font-semibold uppercase w-full">Résultats de recherche</h2>
			<p className={cn("mb-12 text-xl md:text-2xl lg:text-3xl text-center text-[#A2C900] italic", !streams.length && "text-red-700")}>
				<span className="text-white text-xl not-italic">Terme recherché : </span>
				{queryTerm}
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-8 pr-14">
				{streams.length ? streams.map((stream) => <StreamCard key={stream.id} stream={stream} />) : <p className="text-xl text-white">Aucun résultat</p>}
			</div>
		</div>
	);
};

export default SearchResults;
