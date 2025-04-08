import { memo } from "react";

import { AvatarComponent } from "@repo/web/components/AvatarComponent.js";
import type { ActiveChat } from "@repo/web/types/types.js";

export const HeaderDialogWindow = memo<{
	onReturnToMenu: () => void;
	activeChat: ActiveChat;
}>(({ onReturnToMenu, activeChat }) => (
	<div className="flex justify-between gap-4 border-b pb-2">
		<div className="flex gap-4">
			<button
				onClick={onReturnToMenu}
				className="items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md flex h-10 w-10 p-0 lg:hidden"
			>
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
					className="lucide lucide-arrow-left h-4 w-4"
				>
					<path d="m12 19-7-7 7-7" />
					<path d="M19 12H5" />
				</svg>
			</button>
			<span className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 border">
				<div className="w-3 h-2 absolute rounded-full end-0 bottom-0 bg-green-400" />
				<AvatarComponent />
			</span>
			<div className="flex flex-col">
				<span className="font-semibold">{activeChat?.title}</span>
			</div>
		</div>
		{/* <DropdownMenuButton /> */}
	</div>
));
