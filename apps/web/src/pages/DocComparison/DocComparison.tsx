import { useState } from "react";

import { DocComparisonCard } from "@/components/DocComparison/DocComparisonCard.js";
import { Button } from "@/components/ui/button.js";
import { useDocComparison } from "@/hooks/useDocComparison.js";

const DocComprison = () => {
	const [leftDoc, setLeftDoc] = useState(null);
	const [rightDoc, setRightDoc] = useState(null);

	const { handleDocComparison, docResponse } = useDocComparison();

	const uploadFiles = (doc1: File, doc2: File) => {
		const formData = new FormData();
		formData.append("media", doc1);
		formData.append("media", doc2);

		handleDocComparison(formData);
	};

	return (
		<div className="mx-full py-8 bg-[#fbfbfb] px-2">
			<div className="flex flex-col items-center mb-8">
				<h1 className="text-3xl font-bold tracking-tight">
					Сравнение документов
				</h1>
				<p className="text-muted-foreground mt-2">
					Загрузите исходный документ и документ для сравнения
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
				{/* Левая панель - Документ 1 */}
				<DocComparisonCard
					doc={docResponse?.result?.original_text}
					setDoc={setLeftDoc}
				/>

				{/* Правая панель - Документ 2 */}
				<DocComparisonCard
					doc={docResponse?.result?.colored_text}
					setDoc={setRightDoc}
				/>
			</div>

			<div className="flex justify-center mt-6">
				<Button
					onClick={() => uploadFiles(leftDoc, rightDoc)}
					disabled={!leftDoc || !rightDoc}
					className="gap-2"
				>
					Сравнить документы
				</Button>
			</div>
		</div>
	);
};

export default DocComprison;
