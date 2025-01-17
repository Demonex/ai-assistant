import { AvatarDemo } from "./AvatarDemo.js";
import { Input } from "@/components/ui/input.js";
import { DropdownMenuButton } from "./DropdownMenuButton.js";
import ScrollAreaDemo from "./MessageList.js";
import { DialogWindow } from "./DialogWindow.js";
import { memo } from "react";
import { Sidebar } from "./Sidebar.js";

export const ChatComponent = memo(() => {
	return (
		<main className="p-4">
			<div className="gap-8 lg:flex">
				<Sidebar />
				<DialogWindow />
			</div>
		</main>
	);
});
