import { FaStar, FaStarHalf } from "react-icons/fa6";

const RatingStars = ({ voteAverage, voteCount }) => {
	// Convert voteAverage (out of 10) to a star rating (out of 5)
	const convertToStars = (voteAverage) => {
		if (typeof voteAverage !== "number" || isNaN(voteAverage)) {
			return 0; // Return 0 if voteAverage is invalid
		}
		const stars = (voteAverage / 10) * 5;
		// Round up to the nearest whole number
		return Math.ceil(stars);
	};

	// Render the stars based on the rating
	const renderStars = (stars) => {
		const fullStars = Math.floor(stars); // Full stars count
		const halfStar = stars % 1 !== 0; // Check if there's a half star

		return (
			<div className="flex items-center text-xl gap-1">
				{/* Render full stars */}
				{[...Array(fullStars)].map((_, index) => (
					<span key={index} className="text-[#A2C900]">
						<FaStar />
					</span>
				))}
				{/* Render half star if needed */}
				{halfStar && (
					<div className="relative">
						<span className="text-gray-800">
							<FaStar />
						</span>
						<span className="absolute top-0 left-0 text-[#A2C900]">
							<FaStarHalf />
						</span>
					</div>
				)}
				{/* Render empty stars */}
				{[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
					<span key={index} className="text-gray-800">
						<FaStar />
					</span>
				))}
			</div>
		);
	};

	const stars = convertToStars(voteAverage); // Calculate the number of stars

	return (
		<div className="flex flex-col gap-1 mt-2 mb-4">
			{/* Display the stars */}
			{renderStars(stars)}
			{/* Display the rating and vote count */}
			<span className="flex text-sm">
				{stars} étoiles &nbsp; ({voteCount} votes)
			</span>
		</div>
	);
};

export default RatingStars;
