import { Moon, Sun } from "lucide-react";

export function ModeToggle({ darkTheme }) {
	return (
		<>
			{darkTheme === "dark" ? (
				<Moon className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:rotate-0 dark:scale-100" />
			) : (
				<Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			)}
		</>
	);
}
