import { useEffect, useState } from "react";

import { WikiTreeView } from "@repo/web/components/Collection/WikiTreeView.js";
import { Spinner } from "@repo/web/components/Spinner.js";
import { useWiki } from "@repo/web/hooks/useWiki.js";

import { Button } from "@/components/ui/button.js";
import { toast } from "@/hooks/use-toast.js";

type WikiTreeFormProps = {
	collectionId: number;
};

export const WikiTreeForm = ({ collectionId }: WikiTreeFormProps) => {
	const {
		dataWiki,
		loadingWiki,
		errorWiki,
		handleUploadWikiDocs,
		handleRemoveWikiDocs,
		refetchWikiTree,
		errorUploadWikiDocs,
		errorRemoveWikiDocs,
	} = useWiki(collectionId);
	const [upload, setUpload] = useState<number[]>([]);
	const [remove, setRemove] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = () => {
		if (upload.length) {
			setIsLoading(true);

			handleUploadWikiDocs(upload, {
				onSuccess: async () => {
					setUpload([]);
					refetchWikiTree();
					toast({
						title: "Выбранные документы загружены в коллекцию!",
					});
				},
				onSettled: () => setIsLoading(false),
			});
		}
		if (remove.length) {
			setIsLoading(true);

			handleRemoveWikiDocs(remove, {
				onSuccess: async () => {
					setRemove([]);
					refetchWikiTree();
					toast({
						title: "Выбранные документы удалены из коллекции!",
					});
				},
				onSettled: () => setIsLoading(false),
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
					disabled={(!upload.length && !remove.length) || isLoading}
					onClick={onSubmit}
				>
					Применить
				</Button>
				{isLoading && <Spinner size="small" className="ml-2" />}
			</div>
		</>
	);
};
