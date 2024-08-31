import { useSelector, useDispatch } from "react-redux";
import { FaRegTrashCan } from "react-icons/fa6";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteSubscriber } from "@/store/newsletterSlice";
import { toast } from "sonner";

const NewsletterModal = () => {
	// Fetch the subscribers from the store
	const subscribers = useSelector((state) => state.newsletter.subscribers);

	// Get the dispatch function from Redux
	const dispatch = useDispatch();

	// Function to handle the delete action
	const handleDelete = (index) => {
		const confirmed = confirm("Êtes-vous certain de vouloir supprimer cet abonné ?");
		if (confirmed) {
			dispatch(deleteSubscriber(index));
			toast.success("Abonné supprimé de la liste avec succès");
		}
	};

	return (
		<DialogContent className="sm:max-w-2xl border-none bg-white shadow text-black px-4">
			<DialogHeader>
				<DialogTitle className="text-black text-4xl text-center">Abonnés à l'Infolettre</DialogTitle>
				<DialogDescription className="text-center">Cliquer sur le bouton pour modifier ou supprimer un élément de la liste</DialogDescription>
			</DialogHeader>
			<ScrollArea className="w-full h-[450px] px-6">
				<table className="w-full">
					<tbody>
						<tr className="bg-gray-100">
							<th>Index</th>
							<th>Adresse courriel</th>
							<th>Nom</th>
							<th></th>
						</tr>
						{subscribers.map((subscriber, index) => (
							<tr key={index} className={`text-center ${index % 2 === 1 ? "bg-gray-100" : "bg-white"}`}>
								<td>{index + 1}</td>
								<td>{subscriber.email}</td>
								<td>{subscriber.name}</td>
								<td>
									<button onClick={() => handleDelete(index)} title="Supprimer" className="bg-transparent text-red-600 hover:text-red-900 transition my-auto">
										<FaRegTrashCan className="size-4" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</ScrollArea>
		</DialogContent>
	);
};
export default NewsletterModal;
