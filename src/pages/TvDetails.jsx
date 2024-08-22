import { useParams } from "react-router-dom";

const TvShowDetails = () => {
	// Extract the 'id' from the URL
	const { id } = useParams();

	return <div>Tv Show Details</div>;
};
export default TvShowDetails;
