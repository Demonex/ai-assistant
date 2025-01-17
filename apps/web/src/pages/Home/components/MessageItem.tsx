import { AvatarDemo } from "./AvatarDemo.js";
import { DropdownMenuButton } from "./DropdownMenuButton.js";

export const MessageItem = () => {
	return (
		<div className="group relative flex min-w-0 cursor-pointer items-center gap-4 px-6 py-4 hover:bg-muted">
			<span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 border">
				<div className="w-3 h-3 absolute rounded-full end-0 bottom-0 bg-green-400" />
				<span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
					<AvatarDemo />
				</span>
			</span>
			<div className="min-w-0 flex-grow">
				<div className="flex justify-between">
					<span className="font-semibold">Ealasaid Bohlje</span>
					<span className="text-sm text-muted-foreground">10 days</span>
				</div>
				<div className="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-check-check h-4 w-4 flex-shrink-0 text-green-500"
					>
						<path d="M18 6 7 17l-5-5" />
						<path d="m22 10-7.5 7.5L13 16" />
					</svg>
					<span className="truncate text-start text-muted-foreground">
						I might be 10 minutes late. Sorry!
					</span>
				</div>
			</div>
			<div className="absolute bottom-0 end-0 top-0 flex items-center bg-gradient-to-l from-50% px-4 opacity-0 group-hover:opacity-100 from-muted">
				<DropdownMenuButton />
			</div>
		</div>
	);
};
