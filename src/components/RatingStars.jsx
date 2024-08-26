import { FaStar, FaStarHalf } from "react-icons/fa6";

const RatingStars = ({ voteAverage, voteCount }) => {
	// Convert voteAverage (out of 10) to stars (out of 5)
	const convertToStars = (voteAverage) => {
		if (typeof voteAverage !== "number" || isNaN(voteAverage)) {
			return 0;
		}
		const stars = (voteAverage / 10) * 5;
		// Round up to the nearest whole number
		return Math.ceil(stars);
	};

	// Render stars based on the number
	const renderStars = (stars) => {
		const fullStars = Math.floor(stars);
		const halfStar = stars % 1 !== 0;

		return (
			<div className="flex items-center text-xl gap-1">
				{[...Array(fullStars)].map((_, index) => (
					<span key={index} className="text-[#A2C900]">
						<FaStar />
					</span>
				))}
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
				{[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
					<span key={index} className="text-gray-800">
						<FaStar />
					</span>
				))}
			</div>
		);
	};

	const stars = convertToStars(voteAverage);

	return (
		<div className="flex flex-col gap-1 mt-2 mb-4">
			{renderStars(stars)}
			<span className="flex text-sm">
				{stars} étoiles &nbsp; ( {voteCount} votes )
			</span>
		</div>
	);
};

export default RatingStars;
