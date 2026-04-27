import { useEffect, useState } from "react";

import { WikiTreeView } from "@repo/web/components/Collection/WikiTreeView.js";
import { Spinner } from "@repo/web/components/Spinner.js";
import { useWiki } from "@repo/web/hooks/useWiki.js";

import { Button } from "@/components/ui/button.js";
import { toast } from "@/hooks/use-toast.js";

type WikiTreeFormProps = {
	collectionId: number;
	providerUrl: string | unknown;
};

export const WikiTreeForm = ({
	collectionId,
	providerUrl,
}: WikiTreeFormProps) => {
	const {
		dataWiki,
		loadingWiki,
		errorWiki,
		handleUploadWikiDocs,
		handleRemoveWikiDocs,
		refetchWikiTree,
		errorUploadWikiDocs,
		errorRemoveWikiDocs,
		pendingRemoveWikiDocs,
		pendingUploadWikiDocs,
	} = useWiki(collectionId);
	const [upload, setUpload] = useState<number[]>([]);
	const [remove, setRemove] = useState<number[]>([]);

	const onSubmit = () => {
		if (upload.length) {
			handleUploadWikiDocs(upload, {
				onSuccess: async () => {
					setUpload([]);
					refetchWikiTree();
					toast({
						title: "Выбранные документы загружены в коллекцию!",
					});
				},
			});
		}
		if (remove.length) {
			handleRemoveWikiDocs(remove, {
				onSuccess: async () => {
					setRemove([]);
					refetchWikiTree();
					toast({
						title: "Выбранные документы удалены из коллекции!",
					});
				},
			});
		}
	};

	useEffect(() => {
		const error = errorWiki || errorUploadWikiDocs || errorRemoveWikiDocs;

		if (error) {
			toast({
				variant: "destructive",
				title: error.statusCode.toString(),
				description: error.message,
			});
		}
	}, [errorWiki, errorUploadWikiDocs, errorRemoveWikiDocs]);

	if (errorWiki) return;

	if (loadingWiki) return <Spinner size="small" />;

	return (
		<>
			<div className="w-full rounded-md border p-3 max-h-[500px] overflow-auto">
				<WikiTreeView
					data={dataWiki}
					providerUrl={providerUrl}
					onUpload={setUpload}
					onRemove={setRemove}
				/>
			</div>
			<div>
				Загрузить {upload.length} | Удалить {remove.length}
			</div>
			<div className="flex itmes-center">
				<Button
					type="button"
					disabled={
						(!upload.length && !remove.length) ||
						pendingRemoveWikiDocs ||
						pendingUploadWikiDocs
					}
					onClick={onSubmit}
				>
					Применить
				</Button>
				{pendingRemoveWikiDocs ||
					(pendingUploadWikiDocs && <Spinner size="small" className="ml-2" />)}
			</div>
		</>
	);
};
