import type { FC } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion.js";
import { ReactMarkdownComponent } from "./ReactMarkdownComponent.js";
import { memo } from "react";
import type { Fragments } from "@/types/types.js";

export const AccordionComponent = memo<{ fragments: Fragments[] }>(
	({ fragments }) => {
		const openFile = (item) => {
			const fileURL = `${item.file_path}#page=${item.page_num}`;
			window.open(fileURL, "_blank");
		};

		return (
			<Accordion type="single" collapsible className="w-full">
				{fragments?.map((fragment) => (
					<AccordionItem value={fragment._id} key={fragment._id}>
						<AccordionTrigger>
							{`${fragment.file_path.split("/").pop()} - Страница ${fragment.page_num}`}
						</AccordionTrigger>
						<AccordionContent>
							<button
								onClick={() => openFile(fragment)}
								className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mb-2"
							>
								Открыть документ
							</button>
							<ReactMarkdownComponent textMarkdown={fragment.text} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		);
	},
);
