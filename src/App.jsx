import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "./components/ui/sonner";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="min-h-screen w-screen flex flex-col">
				<Header />
				<main className="flex-1">
					<Outlet />
				</main>
				<Toaster />
				<Footer />
			</div>
		</ThemeProvider>
	);
}

export default App;
