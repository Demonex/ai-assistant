import { formatLocalTime } from "@/helpers/index.js";
import { AccordionComponent } from "./AccordionComponent.js";
import { ReactMarkdownComponent } from "./ReactMarkdownComponent.js";
import { memo } from "react";
import type { Message } from "@/types/types.js";
import { toast } from "@/hooks/use-toast.js";
import { Copy } from "lucide-react";

export const MessageBubble = memo<{
	message: Message;
	isRequest: boolean;
}>(({ message, isRequest }) => {
	const {
		created_at,
		message: text,
		fragments,
	} = isRequest ? message.request : message.response;

	const handleCopy = async (text: string) => {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("copy");
		document.body.removeChild(textArea);

		toast({
			title: "Текст cкопирован!",
		});
	};

	return (
		<div className={`max-w-screen-sm ${isRequest ? "self-end" : "w-full"}`}>
			<div className={`flex items-center gap-2 ${!isRequest && "w-full"}`}>
				<div
					className={`shadow-base rounded-lg border bg-card text-card-foreground ${
						isRequest ? "order-1" : "w-full"
					}`}
				>
					<div
						className={`relative inline-flex px-4 ${!isRequest ? "w-full pt-6" : "pt-4 pb-4"}`}
					>
						{!isRequest && (
							<div
								title="Копировать текст"
								onClick={() => handleCopy(message.response.message)}
								className="absolute left-[calc(100%-50px)] top-[-20px] flex items-center cursor-pointer hover:opacity-80 rounded-lg border bg-card text-card-foreground p-2"
							>
								<Copy size={20} />
							</div>
						)}

						<ReactMarkdownComponent textMarkdown={text} />
					</div>

					{!isRequest && fragments && fragments.length > 0 && (
						<div className="inline-flex w-full">
							<AccordionComponent fragments={fragments} />
						</div>
					)}
				</div>
			</div>
			<div
				className={`flex items-center gap-2 ${isRequest ? "justify-end" : ""}`}
			>
				<time
					className={`mt-1 flex items-center text-sm text-muted-foreground ${
						isRequest ? "justify-end" : ""
					}`}
				>
					{formatLocalTime(created_at || new Date().toString(), "time")}
				</time>
			</div>
		</div>
	);
});
