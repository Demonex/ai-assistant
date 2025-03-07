import { formatLocalTime } from "@/helpers/index.js";
import { AccordionComponent } from "./AccordionComponent.js";
import { ReactMarkdownComponent } from "./ReactMarkdownComponent.js";
import { memo } from "react";
import type { MessageProps } from "@/types/types.js";

export const MessageBubble = memo<{
	message: MessageProps;
	isRequest: boolean;
}>(({ message, isRequest }) => {
	const {
		created_at,
		message: text,
		fragments,
	} = isRequest ? message.request : message.response;

	return (
		<div className={`max-w-screen-sm ${isRequest ? "self-end" : "w-full"}`}>
			<div className="flex items-center gap-2">
				{!isRequest && fragments && fragments.length > 0 ? (
					<div className="shadow-base rounded-lg border bg-card text-card-foreground">
						<div className={`inline-flex p-4 ${!isRequest && "w-full"}`}>
							<ReactMarkdownComponent textMarkdown={text} />
						</div>
						<div className={`inline-flex p-4 ${!isRequest && "w-full"}`}>
							<AccordionComponent fragments={fragments} />
						</div>
					</div>
				) : (
					<div className="shadow-base rounded-lg border bg-card text-card-foreground">
						<div className="inline-flex p-4">
							<ReactMarkdownComponent textMarkdown={text} />
						</div>
					</div>
				)}
			</div>
			<div
				className={`flex items-center gap-2 ${isRequest ? "justify-end" : ""}`}
			>
				<time className="mt-1 flex items-center text-sm text-muted-foreground">
					{formatLocalTime(created_at || new Date().toString())}
				</time>
			</div>
		</div>
	);
});
