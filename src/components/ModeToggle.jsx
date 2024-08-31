import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<>
			{theme === "dark" ? (
				<Button onClick={() => setTheme("light")} variant="ghost" title="Mode clair" size="icon" className="group  hover:bg-transparent hover:opacity-70">
					<Sun className="h-[1.75rem] w-[1.75rem] text-secondary transition-all duration-300" />
				</Button>
			) : (
				<Button onClick={() => setTheme("dark")} variant="ghost" title="Mode sombre" size="icon" className="group hover:bg-transparent hover:opacity-70">
					<Moon className="h-[1.75rem] w-[1.75rem] text-secondary transition-all duration-300" />
				</Button>
			)}
		</>
	);
}
