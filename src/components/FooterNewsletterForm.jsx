import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

const FooterNewsletterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log("Form Data:", data);
		// Handle form submission here
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

			<div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mt-4 gap-4">
				<div className="flex items-center space-x-2">
					<Checkbox id="newsletter" {...register("newsletter")} />
					<label htmlFor="newsletter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
						Je veux recevoir l'infolettre de StreamRadar
					</label>
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
