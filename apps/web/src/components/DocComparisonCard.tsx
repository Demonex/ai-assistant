import { ReactMarkdownComponent } from "./Chat/DialogWindow/component/ReactMarkdownComponent.js";
import { CardContent, CardHeader, CardTitle } from "./ui/card.js";
import { Input } from "./ui/input.js";
import { ScrollArea } from "./ui/scroll-area.js";

export const DocComparisonCard = ({ doc, setDoc }) => (
	<div className="rounded-xl text-card-foreground ">
		<CardHeader>
			<CardTitle className="flex items-center justify-center gap-2">
				Документ 1
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-4">
				<div className="grid w-full items-center gap-1.5">
					<Input
						className="file:h-full file:py-0"
						id="original-doc"
						type="file"
						onChange={(e) => setDoc(e.target.files[0])}
					/>
				</div>
				<ScrollArea className="rounded-md border bg-muted/50 p-4 h-[500px]">
					{doc ? (
						<pre className="whitespace-pre-wrap text-sm">
							<ReactMarkdownComponent textMarkdown={doc} />
						</pre>
					) : (
						<p className="text-muted-foreground text-center mt-32">
							Загрузите исходный документ
						</p>
					)}
				</ScrollArea>
			</div>
		</CardContent>
	</div>
);
