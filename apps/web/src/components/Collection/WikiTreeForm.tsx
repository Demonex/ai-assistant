import { useCallback, useState } from "react";

import { WikiTreeView } from "@repo/web/components/Collection/WikiTreeView.js";
import { Spinner } from "@repo/web/components/Spinner.js";
import { useWiki } from "@repo/web/hooks/useWiki.js";

import { Button } from "@/components/ui/button.js";
import { WikiTreeType } from "@/types/types.js";

export const WikiTreeForm = () => {
	const { dataWiki, loadingWiki } = useWiki();
	const [files, setFiles] = useState<WikiTreeType[]>([]);

	const handleList = useCallback((list: WikiTreeType[]) => {
		setFiles(list);
		console.log("list", list);
	}, []);

	const onUploadFile = useCallback(() => {
		console.log("files", files);
	}, [files]);

	if (loadingWiki) return <Spinner size="small" />;

	return (
		<>
			<div className="w-full rounded-md border p-3 max-h-[500px] overflow-auto">
				<WikiTreeView data={dataWiki} onChange={handleList} />
			</div>
			<Button type="button" disabled={!files.length} onClick={onUploadFile}>
				Загрузить
			</Button>
		</>
	);
};
