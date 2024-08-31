import { FaSpinner } from "react-icons/fa6";

const Spinner = () => {
	return (
		<div className="text-black dark:text-white w-full h-full flex flex-col items-center justify-center min-h-[calc(100vh-350px)]">
			{/* Spinner icon with a spin animation */}
			<FaSpinner className="animate-spin text-8xl text-[#A2C900] mb-4" />
			{/* Loading message */}
			<p className="text-2xl font-light">Chargement, veuillez patienter...</p>
		</div>
	);
};

export default Spinner;
