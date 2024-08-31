import { Link } from "react-router-dom";
import { useTheme } from "@/providers/ThemeProvider";
import { socials, links } from "@/data/constants";
import FooterNewsletterForm from "./FooterNewsletterForm";

const Footer = () => {
	// Extracting the theme (Light/Dark mode)
	const { theme } = useTheme();

	return (
		<footer className="w-full bg-gray-100 shadow-xl dark:bg-[#131313]">
			<section className="grid grid-cols-1 lg:grid-cols-3 min-h-[200px] bg-gray-200 dark:bg-[#252525] pt-6 px-[5%]">
				<div className="flex flex-col justify-center">
					{/* Logo with conditional theme-based image (Light/Dark mode) */}
					<Link to="/" className="flex items-center justify-center lg:justify-start">
						<img
							src={theme === "dark" ? "/assets/images/streamradar_logo--white.svg" : "/assets/images/streamradar_logo.svg"}
							alt="Logo de StreamRadar"
							className="h-20"
						/>
					</Link>

					{/* Social links */}
					<nav>
						<ul className="flex items-center justify-center gap-4">
							{socials.map((social) => (
								<li key={social.name}>
									<a
										href={social.href}
										target="_blank"
										rel="noreferrer"
										className="text-[1.8rem] text-gray-800 hover:text-secondary dark:text-gray-100 dark:hover:text-secondary transition-all duration-300 cursor-pointer"
									>
										<social.icon />
									</a>
								</li>
							))}
						</ul>
					</nav>
					{/* Copyright message */}
					<p className="text-center lg:mr-16 text-xs font-medium dark:text-gray-50 my-6">
						© {new Date().getFullYear()} <span className="text-secondary">StreamRadar</span>. Tous les droits sont réservés.
					</p>
				</div>

				{/* Newsletter form */}
				<div className="pb-6 lg:px-0 max-w-[500px] mx-auto">
					<h3 className="text-2xl uppercase font-bold tracking-wide mb-4 text-center">Inscription à l'infolettre</h3>
					<FooterNewsletterForm />
				</div>
				<div className="hidden lg:block">
					<ul className="w-full h-full flex flex-col items-end justify-evenly pb-8">
						<h4 className="text-2xl font-bold uppercase text-secondary">Navigation</h4>
						{links.map((link) => (
							<li key={link.name}>
								<Link
									to={link.path}
									className="text-lg font-medium text-gray-900 hover:text-secondary dark:text-gray-100 dark:hover:text-secondary transition-all duration-300"
								>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</section>
			<section className="py-4">
				<p className="text-center text-sm font-medium dark:text-gray-50">
					Une création de{" "}
					<a href="https://yvanblanchette.com" className="text-secondary opacity-80 hover:opacity-100 font-semibold transition-all duration-300">
						Yvan jr Blanchette
					</a>{" "}
					<br className="block lg:hidden" />
					dans le cadre de l'AEC en Développement Web <br className="block lg:hidden" />
					du Cégep de Trois-Rivières
				</p>
			</section>
		</footer>
	);
};
export default Footer;
