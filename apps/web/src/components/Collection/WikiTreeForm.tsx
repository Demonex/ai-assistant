import { useCallback, useEffect, useState } from "react";

import { WikiTreeView } from "@repo/web/components/Collection/WikiTreeView.js";
import { Spinner } from "@repo/web/components/Spinner.js";
import { useWiki } from "@repo/web/hooks/useWiki.js";

import { Button } from "@/components/ui/button.js";
import { toast } from "@/hooks/use-toast.js";

type WikiTreeFormProps = {
	collectionId: number;
};

export const WikiTreeForm = ({ collectionId }: WikiTreeFormProps) => {
	const { dataWiki, loadingWiki, errorWiki } = useWiki(collectionId);
	const [upload, setUpload] = useState<number[]>([]);
	const [remove, setRemove] = useState<number[]>([]);

	const onSubmit = useCallback(() => {
		console.log("upload", upload);
		console.log("remove", remove);
	}, [upload, remove]);

	useEffect(() => {
		if (errorWiki) {
			toast({
				variant: "destructive",
				title: errorWiki.statusCode.toString(),
				description: errorWiki.message,
			});
		}
	}, [errorWiki]);

	if (errorWiki) return;

	if (loadingWiki) return <Spinner size="small" />;

	return (
		<>
			<div className="w-full rounded-md border p-3 max-h-[500px] overflow-auto">
				<WikiTreeView
					data={dataWiki}
					onUpload={setUpload}
					onRemove={setRemove}
				/>
			</div>
			<div>
				Загрузить {upload.length} | Удалить {remove.length}
			</div>
			<Button
				type="button"
				disabled={!upload.length && !remove.length}
				onClick={onSubmit}
			>
				Применить
			</Button>
		</>
	);
};
