import { Button } from "@/components/ui/button";

const Movies = () => {
	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] ">
			<h2 className="text-5xl font-semibold mb-6">Films</h2>
			<Button onClick={() => (window.location.href = "/")}>Retour à la page d'accueil</Button>
		</div>
	);
};
export default Movies;
