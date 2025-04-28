import { ReactMarkdownComponent } from "@/components/ReactMarkdownComponent.js";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion.js";
import {
	ALLOWED_EXTENSIONS_MEDIA,
	ALLOWED_EXTENSIONS_TEXT,
} from "@/constants/index.js";

export const AccordionHelp = () => {
	const helpList = [
		{
			id: 1,
			title: "Доступные форматы файлов",
			text: `Для загрузки: **${ALLOWED_EXTENSIONS_TEXT.join(", ")}**\n\nДля транскрипции: **${ALLOWED_EXTENSIONS_MEDIA.join(", ")}**`,
		},
	];

	return (
		<Accordion type="single" collapsible className="w-full">
			{helpList.map((item) => (
				<AccordionItem value={`${item.id}`} key={item.id}>
					<AccordionTrigger>{item.title}</AccordionTrigger>

					<AccordionContent>
						<ReactMarkdownComponent textMarkdown={item.text} />
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};
