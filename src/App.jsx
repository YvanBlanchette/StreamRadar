import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="min-h-screen w-screen flex flex-col">
				<Header />
				<main className="flex-1 bg-[url('./assets/images/background.svg')] bg-cover">
					<Outlet />
				</main>
				<Footer />
			</div>
		</ThemeProvider>
	);
}

export default App;
