const Footer = () => {
	return (
		<footer className="w-full bg-white shadow-t-xl dark:bg-[#0F1523] py-6">
			<p className="text-center text-xs md:text-sm font-medium dark:text-gray-50 mb-1">
				&copy; Copyright {new Date().getFullYear()} -{" "}
				<a href="https://yvanblanchette.com" className="text-secondary uppercase opacity-80 hover:opacity-100 font-semibold transition-all duration-300">
					Nebula Technologies
				</a>{" "}
				- Tous droits réservés
			</p>
			<p className="text-center text-sm font-medium dark:text-gray-50">
				Une création de{" "}
				<a href="https://yvanblanchette.com" className="text-secondary opacity-80 hover:opacity-100 font-semibold transition-all duration-300">
					Yvan jr Blanchette
				</a>
			</p>
		</footer>
	);
};
export default Footer;
