import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addSubscriber } from "@/store//newsletterSlice";
import { toast } from "sonner";

const FooterNewsletterForm = () => {
	const subscribersList = useSelector((state) => state.newsletter.subscribers);
	const dispatch = useDispatch();

	// Extracting the register, reset, formState and handleSubmit methods from the useForm hook
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	// Function to check if the email is unique
	const uniqueEmail = (email) => {
		return subscribersList.some((subscriber) => subscriber.email === email);
	};

	// Function to handle form submission
	const onSubmit = (data) => {
		// Check if the email is unique
		if (uniqueEmail(data.email)) {
			toast.error("L'abonné est déjà inscrit");
		} else {
			// Dispatch the addSubscriber action with the form data
			dispatch(addSubscriber(data));

			toast.success("Inscription réussie !");
			// Reset the form
			reset();
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			{/* Name input */}
			<div className="mb-2">
				<input
					type="text"
					placeholder="Nom complet"
					className={`w-full px-4 py-1.5 border dark:bg-[#3b3b3b] dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary ${
						errors.name ? "border-red-500" : ""
					}`}
					{...register("name", { required: "Votre nom est requis" })}
				/>
				{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
			</div>

			{/* Email input */}
			<div className="mb-2">
				<input
					type="email"
					placeholder="Adresse courriel"
					className={`w-full px-3 py-1.5 border dark:bg-[#3b3b3b] dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary ${
						errors.email ? "border-red-500" : ""
					}`}
					{...register("email", {
						required: "Votre adresse courriel est requise",
						pattern: {
							value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
							message: "Adresse courriel invalide",
						},
					})}
				/>
				{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
			</div>

			{/* Checkbox input */}
			<div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mt-4 gap-4">
				<div className="flex flex-col">
					<div className="flex items-center space-x-2">
						<input type="checkbox" id="newsletter" {...register("newsletter", { required: "Vous devez accepter les conditions" })} />
						<label htmlFor="newsletter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
							Je veux recevoir l'infolettre de StreamRadar
						</label>
					</div>
					{errors.newsletter && <p className="text-red-500 text-sm">{errors.newsletter.message}</p>}
				</div>

				{/* Submit button */}
				<button
					type="submit"
					className="lg:w-fit w-full px-4 py-2 hover:opacity-80 bg-secondary font-medium dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary"
				>
					Envoyer
				</button>
			</div>
		</form>
	);
};

export default FooterNewsletterForm;
