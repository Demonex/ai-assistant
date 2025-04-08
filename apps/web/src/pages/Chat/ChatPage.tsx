import { memo } from "react";

import { DialogWindow } from "../../components/Chat/DialogWindow/DialogWindow.js";
import { Sidebar } from "../../components/Chat/Sidebar/Sidebar.js";
import { useChats } from "../../hooks/useChats.js";

const ChatPage = memo(() => {
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

export default ChatPage;
