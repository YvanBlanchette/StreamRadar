const Footer = () => {
	return (
		<footer className="w-full bg-gray-100 shadow-xl dark:bg-[#131313] py-6">
			<p className="text-center text-sm font-medium dark:text-gray-50">
				Une création de{" "}
				<a href="https://yvanblanchette.com" className="text-secondary opacity-80 hover:opacity-100 font-semibold transition-all duration-300">
					Yvan jr Blanchette
				</a>
			</p>
			<p className="text-center text-sm font-medium dark:text-gray-50">Dans le cadre de l'AEC en Développement Web</p>
			<p className="text-center text-sm font-medium dark:text-gray-50">du Cégep de Trois-Rivières</p>
		</footer>
	);
};
export default Footer;
