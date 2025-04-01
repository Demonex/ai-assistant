import { memo } from "react";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import type { Chats } from "@repo/web/types/types.js";

import { ChatItem } from "@/components/ChatItem.js";

const ChatList = memo<{ chats: Chats[] }>(({ chats }) => (
	<ScrollArea.Root className="ScrollAreaRoot">
		<ScrollArea.Viewport className="ScrollAreaViewport">
			<div className="block min-w-0 divide-y">
				{chats?.map((chat) => (
					<div className="Tag" key={chat.id}>
						<ChatItem title={chat.title} id={chat.id} />
					</div>
				))}
			</div>
		</ScrollArea.Viewport>
		<ScrollArea.Scrollbar orientation="vertical">
			<ScrollArea.Thumb className="ScrollAreaThumb" />
		</ScrollArea.Scrollbar>
		<ScrollArea.Scrollbar orientation="horizontal">
			<ScrollArea.Thumb className="ScrollAreaThumb" />
		</ScrollArea.Scrollbar>
		<ScrollArea.Corner className="ScrollAreaCorner" />
	</ScrollArea.Root>
));

export default ChatList;
