import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { links, socials } from "@/data/constants";
import { ModeToggle } from "@/components/ModeToggle";
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useTheme } from "@/providers/ThemeProvider";
import SearchField from "@/components/SearchField";
import NewsletterModal from "@/components/NewsletterModal";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { FaUser, FaUsers, FaUsersRectangle, FaUserTie } from "react-icons/fa6";
import { useState } from "react";

const Header = () => {
	// State to control the visibility of the Drawer
	const [isAdmin, setIsAdmin] = useState(true);

	// Extract the current path to highlight the active link
	const pathname = useLocation().pathname;

	// Extract the current theme for Light/Dark mode
	const { theme } = useTheme();

	return (
		<header className="w-full bg-transparent md:shadow-lg dark:shadow-[#A2C900]/30">
			{/* Main container for header */}
			<div className="w-[90vw] mx-auto max-w-7xl flex justify-between items-center py-6">
				{/* Logo with conditional theme-based image (Light/Dark mode) */}
				<Link to="/">
					<img
						src={theme === "dark" ? "/assets/images/streamradar_logo--white.svg" : "/assets/images/streamradar_logo.svg"}
						alt="Logo de StreamRadar"
						className="h-20"
					/>
				</Link>

				{/* Navigation menu and Drawer Trigger for mobile */}
				<div className="flex justify-end items-center gap-4">
					<nav>
						<ul className="flex items-center justify-end gap-6">
							{/* Desktop navigation */}
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
							{/* Search field */}
							<li className="hidden lg:block">
								<SearchField />
							</li>
							{/* Mode toggle */}
							<li className="hidden lg:block" aria-hidden="true">
								<ModeToggle />
							</li>
							{/* Newsletter modal */}
							{isAdmin && (
								<li className="hidden lg:block">
									<Dialog>
										<DialogTrigger asChild>
											<FaUsers title="Abonnés infolettre" className="text-2xl text-[#A2C900] hover:opacity-70 transition cursor-pointer" />
										</DialogTrigger>
										<NewsletterModal />
									</Dialog>
								</li>
							)}
						</ul>
					</nav>

					{/* Mobile navigation drawer */}
					<Drawer>
						<DrawerTrigger className="lg:hidden">
							<Menu className="dark:text-white size-10" />
						</DrawerTrigger>
						<DrawerContent>
							{/* Header with close button */}
							<DrawerHeader>
								<DrawerClose className="text-end">
									<Button variant="ghost">
										<X className="dark:text-white size-10" />
									</Button>
								</DrawerClose>
							</DrawerHeader>
							<DrawerBody className="-translate-y-[30px]">
								{/* Logo inside the drawer */}
								<DrawerTitle>
									<Link to="/">
										<img
											src={theme === "dark" ? "/assets/images/streamradar_logo--white.svg" : "/assets/images/streamradar_logo.svg"}
											alt="Logo de StreamRadar"
											className="h-20 md:h-28 mx-auto"
										/>
									</Link>
								</DrawerTitle>
								<nav className="h-full">
									{/* Drawer navigation links */}
									<ul className="flex flex-col justify-evenly items-center h-full pt-28 pb-40">
										{links.map((link) => (
											<li
												key={link.name}
												className="dark:text-white dark:hover:text-secondary hover:text-secondary text-xl md:text-3xl transition-all duration-200"
											>
												<DrawerClose asChild>
													<Link to={link.path}>{link.name}</Link>
												</DrawerClose>
											</li>
										))}
									</ul>
								</nav>
							</DrawerBody>
							{/* Drawer footer with social links */}
							<DrawerFooter>
								<ul className="flex items-center justify-center gap-10 pb-10">
									{socials.map((social) => {
										const IconComponent = social.icon;
										return (
											<li key={social.name}>
												<a
													href={social.href}
													target="_blank"
													rel="noopener noreferrer"
													className="dark:text-white dark:hover:text-secondary hover:text-secondary text-2xl md:text-4xl transition-all duration-200"
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

			{/* isAdmin toggle */}
			<div
				onClick={() => setIsAdmin(!isAdmin)}
				className="hidden fixed z-50 bottom-10 right-10 bg-secondary/30 hover:bg-secondary/40 transition w-[90px] aspect-square rounded-full lg:flex justify-center items-center cursor-pointer"
			>
				{isAdmin ? (
					<div className="flex flex-col justify-center items-center">
						<FaUserTie className="text-4xl text-black" />
						<p className="text-black">ADMIN</p>
					</div>
				) : (
					<div className="flex flex-col justify-center items-center">
						<FaUser className="text-4xl text-black" />
						<p className="text-black">USER</p>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
