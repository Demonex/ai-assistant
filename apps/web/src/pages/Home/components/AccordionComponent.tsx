import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion.js";
import { ReactMarkdownComponent } from "./ReactMarkdownComponent.js";

export function AccordionComponent({ items }) {
	const openFile = (url) => {
		const fileURL = URL.createObjectURL(url);

		window.open(fileURL, "_blank");
		URL.revokeObjectURL(fileURL);
	};

	return (
		<Accordion type="single" collapsible className="w-full">
			{items?.map((item) => (
				<AccordionItem value={item.id} key={item.id}>
					<AccordionTrigger>{item.title}</AccordionTrigger>
					<AccordionContent>
						<button
							onClick={() => openFile(item.url)}
							className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mb-2"
						>
							Открыть документ
						</button>
						<ReactMarkdownComponent textMarkdown={item.text} />
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
