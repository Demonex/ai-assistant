import { memo } from "react";

import { useChats } from "../hooks/useChats.js";
import { DialogWindow } from "./DialogWindow.js";
import { Sidebar } from "./Sidebar.js";

export const ChatComponent = memo(() => {
	const { activeChat } = useChats();

	return (
		<main className="p-4 bg-[#fbfbfb]">
			<div className="gap-8 lg:flex">
				<Sidebar />
				{activeChat && <DialogWindow />}
			</div>
		</main>
	);
});
