import { FaTriangleExclamation } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Component to display an error message
const Error = ({ message = "Erreur 404 - Page introuvable..." }) => {
	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-350px)] gap-4">
			{/* Main error message  */}
			<h1 className="text-white mt-20 text-2xl lg:text-5xl flex items-center gap-4">
				{/* Icon for the error message */}
				<FaTriangleExclamation className="text-secondary text-7xl" />
				{message}
			</h1>

			{/* Link to navigate back to the homepage */}
			<Link to="/" className="lg:text-2xl mt-2 hover:text-secondary transition-all duration-300">
				Retour vers la page d'accueil
			</Link>
		</div>
	);
};

export default Error;
