import { memo } from "react";

import { DialogWindow } from "@repo/web/components/Chat/DialogWindow/DialogWindow.js";
import { Sidebar } from "@repo/web/components/Chat/Sidebar/Sidebar.js";
import { useChats } from "@repo/web/hooks/useChats.js";

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
