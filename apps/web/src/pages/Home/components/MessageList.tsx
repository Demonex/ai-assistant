import * as ScrollArea from "@radix-ui/react-scroll-area";
import { MessageItem } from "./MessageItem.js";

const TAGS = new Array(9).fill(<MessageItem />);

const MessageList = ({ onOpenDialogWindow }) => (
	<ScrollArea.Root className="ScrollAreaRoot">
		<ScrollArea.Viewport className="ScrollAreaViewport">
			<div className="block min-w-0 divide-y" onClick={onOpenDialogWindow}>
				{TAGS.map((tag, id) => (
					<div className="Tag" key={id}>
						{tag}
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
);

export default MessageList;
