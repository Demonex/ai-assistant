import { type FC, useState, useRef } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion.js";
import { toast } from "@/hooks/use-toast.js";
import { Copy, ClipboardList } from "lucide-react";
import { ReactMarkdownComponent } from "./ReactMarkdownComponent.js";

interface ItemFileType {
	_id: string;
	file_path: string;
	page_num: number;
	text: string;
}

interface AccordionProps {
	items: ItemFileType[];
}

export const AccordionComponent: FC<AccordionProps> = ({ items }) => {
	const tooltipRef = useRef(null);

	const [isShowCopy, setIsShowCopy] = useState<string | null>(null);
	const [positionCopy, setPositionCopy] = useState<{ top: number }>({ top: 0 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const offsetY = e.clientY - rect.top;

		const tooltipHeight = tooltipRef.current?.offsetHeight || 0;
		let correctedTop = offsetY - tooltipHeight / 2;

		correctedTop = Math.max(
			0,
			Math.min(correctedTop, rect.height - tooltipHeight),
		);

		setPositionCopy({ top: correctedTop });
	};

	const handleCopy = async (type: "text" | "full", text: string) => {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("copy");
		document.body.removeChild(textArea);

		toast({
			title: `${type === "text" ? "Текст Фрагмента" : "Фрагент"}  cкопирован!`,
		});
	};

	const openFile = (item: ItemFileType) => {
		const fileURL = `${item.file_path}#page=${item.page_num}`;
		window.open(fileURL, "_blank");
	};

	const getFileName = (name: string) => {
		const getName = name.split("/").pop();
		return getName.split(".pdf")[0];
	};

	return (
		<Accordion type="single" collapsible className="w-full">
			{items?.map((item: ItemFileType) => (
				<AccordionItem
					className="p-4 relative"
					value={item._id}
					key={item._id}
					onMouseMove={handleMouseMove}
					onMouseEnter={() => setIsShowCopy(item._id)}
					onMouseLeave={() => setIsShowCopy(null)}
				>
					<AccordionTrigger>
						{`${getFileName(item.file_path)} - Страница ${item.page_num}`}
					</AccordionTrigger>
					<AccordionContent>
						<button
							onClick={() => openFile(item)}
							className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mb-2"
						>
							Открыть документ
						</button>
						<ReactMarkdownComponent textMarkdown={item.text} />
					</AccordionContent>

					{isShowCopy === item._id && (
						<div
							ref={tooltipRef}
							style={{ top: `${positionCopy.top}px` }}
							className="absolute left-[100%] top-[20px] flex items-center cursor-pointer rounded-lg border bg-card text-card-foreground p-4"
						>
							<div
								title="Копировать текст фрагмента"
								onClick={() => handleCopy("text", item.text)}
							>
								<Copy size={20} />
							</div>
							<div
								className="ml-4"
								title="Копировать Фрагмент"
								onClick={() =>
									handleCopy(
										"full",
										`${getFileName(item.file_path)} - Страница ${item.page_num} [${item.file_path}#page=${item.page_num}]\n\n${item.text}`,
									)
								}
							>
								<ClipboardList size={20} />
							</div>
						</div>
					)}
				</AccordionItem>
			))}
		</Accordion>
	);
};
