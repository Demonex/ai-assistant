import { DialogWindow } from "./DialogWindow.js";
import { memo } from "react";
import { Sidebar } from "./Sidebar.js";
import { useChats } from "../hooks/useChats.js";

export const ChatComponent = memo(() => {
	const { activeChat } = useChats();

	return (
		<main className="p-4">
			<div className="gap-8 lg:flex">
				<Sidebar />
				{activeChat && <DialogWindow />}
			</div>
		</main>
	);
});
