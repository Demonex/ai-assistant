import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/web/components/ui/accordion.js";
import { toast } from "@repo/web/hooks/use-toast.js";
import { Copy, CopyPlus } from "lucide-react";
import { ReactMarkdownComponent } from "./ReactMarkdownComponent.js";
import { memo } from "react";
import type { Fragment } from "@repo/web/types/types.js";

export const AccordionComponent = memo<{ fragments: Fragment[] }>(
	({ fragments }) => {
		const getFileName = (name: string) => {
			const getName = name.split("/").pop();
			return getName.split(".pdf")[0];
		};

		const getFragmentTitle = (fragment: Fragment) => {
			return `${getFileName(fragment.file_path)} - Страница ${fragment.page_num + 1}`;
		};

		const getFragmentLink = (fragment: Fragment) => {
			return `${fragment.file_path}#page=${fragment.page_num + 1}`;
		};

		const handleCopy = async (isFull: boolean, fragment: Fragment) => {
			const textArea = document.createElement("textarea");

			const text = isFull
				? `${getFragmentTitle(fragment)}\n\n${getFragmentLink(fragment)}\n\n******\n\n${fragment.text}`
				: fragment.text;

			textArea.value = text;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);

			toast({
				title: `${isFull ? "Фрагмент" : "Текст фрагмента"}  cкопирован!`,
			});
		};

		const openFile = (fragment: Fragment) => {
			const fileURL = `${fragment.file_path}#page=${fragment.page_num + 1}`;
			window.open(fileURL, "_blank");
		};

		return (
			<Accordion type="single" collapsible className="w-full">
				{fragments?.map((fragment) => (
					<AccordionItem
						className="p-4 relative"
						value={fragment._id}
						key={fragment._id}
					>
						<AccordionTrigger>{getFragmentTitle(fragment)}</AccordionTrigger>

						<AccordionContent>
							<div className="flex items-center justify-between w-full mb-2">
								<button
									onClick={() => openFile(fragment)}
									className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
								>
									Открыть документ
								</button>

								<div className="flex items-center cursor-pointer rounded-lg border bg-card text-card-foreground p-2">
									<div
										className="hover:opacity-80"
										title="Копировать текст фрагмента"
										onClick={() => handleCopy(false, fragment)}
									>
										<Copy size={20} />
									</div>
									<div
										className="ml-4 hover:opacity-80"
										title="Копировать Фрагмент"
										onClick={() => handleCopy(true, fragment)}
									>
										<CopyPlus size={20} />
									</div>
								</div>
							</div>

							<ReactMarkdownComponent textMarkdown={fragment.text} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		);
	},
);
