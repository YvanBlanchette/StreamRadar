import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { links, socials } from "@/data/constants";
import { ModeToggle } from "./ModeToggle";
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { useTheme } from "./providers/ThemeProvider";

const Header = () => {
	const pathname = useLocation().pathname;
	const { theme } = useTheme();

	return (
		<header className="w-full bg-white dark:bg-black">
			<div className="w-[90vw] mx-auto max-w-7xl flex justify-between items-center py-6">
				<Link to="/">
					{theme === "dark" ? (
						<img src="assets/images/streamradar_logo--white.svg" alt="Logo de StreamRadar" className="h-20" />
					) : (
						<img src="assets/images/streamradar_logo.svg" alt="Logo de StreamRadar" className="h-20" />
					)}
				</Link>
				<div className="flex justify-end items-center gap-4">
					<nav>
						<ul className="flex items-center justify-end gap-6">
							{links.map((link) => (
								<li
									key={link.name}
									className={`hidden lg:block font-semibold text-lg ${
										pathname === link.path
											? "text-secondary pointer-events-none"
											: "text-gray-900 dark:text-white hover:text-secondary dark:hover:text-secondary transition-all duration-200"
									}`}
								>
									<Link to={link.path}>{link.name}</Link>
								</li>
							))}
							<li>
								<ModeToggle />
							</li>
						</ul>
					</nav>

					<Drawer>
						<DrawerTrigger className="lg:hidden">
							<Menu className="dark:text-white" />
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerClose className="text-end">
									<Button variant="ghost">
										<X />
									</Button>
								</DrawerClose>
							</DrawerHeader>
							<DrawerBody className="-translate-y-[30px]">
								<DrawerTitle>
									<Link to="/">
										<h2 className="text-4xl tracking-wider hover:text-secondary transition-all duration-200 font-bold">VRT Starter</h2>
									</Link>
								</DrawerTitle>
								<nav className="h-full">
									<ul className="py-16 flex flex-col items-center justify-between h-full">
										{links.map((link) => (
											<li key={link.name} className="dark:text-white dark:hover:text-secondary hover:text-secondary text-xl transition-all duration-200">
												<DrawerClose asChild>
													<Link to={link.path}>{link.name}</Link>
												</DrawerClose>
											</li>
										))}
									</ul>
								</nav>
							</DrawerBody>
							<DrawerFooter>
								<ul className="flex items-center justify-center gap-10">
									{socials.map((social) => {
										const IconComponent = social.icon;
										return (
											<li key={social.name}>
												<a
													href={social.href}
													target="_blank"
													className="dark:text-white dark:hover:text-secondary hover:text-secondary text-2xl transition-all duration-200"
												>
													<IconComponent />
												</a>
											</li>
										);
									})}
								</ul>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			</div>
		</header>
	);
};

export default Header;
