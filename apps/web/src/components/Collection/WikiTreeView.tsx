import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox.js";
import { Label } from "@/components/ui/label.js";
import type { WikiTreeType } from "@/types/types.js";

type WikiTreeViewProps = {
	data: WikiTreeType[];
	onUpload: (selectedPages: number[]) => void;
	onRemove: (selectedPages: number[]) => void;
};

export const WikiTreeView = memo<WikiTreeViewProps>(
	({ data, onUpload, onRemove }) => {
		const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
		const [removalIds, setRemovalIds] = useState<Set<number>>(new Set());

		const flattenedData = useMemo(() => {
			const flatten = (
				pages: WikiTreeType[],
				result: WikiTreeType[] = [],
			): WikiTreeType[] => {
				pages.forEach((page) => {
					result.push(page);
					if (page.children) {
						flatten(page.children, result);
					}
				});
				return result;
			};
			return flatten(data);
		}, [data]);

		const getChildLeafIds = useCallback((page: WikiTreeType): number[] => {
			let ids: number[] = [];
			if (page.isFolder && page.children) {
				page.children.forEach((child) => {
					if (!child.isFolder) {
						ids.push(child.id);
					}
					ids.push(...getChildLeafIds(child));
				});
			}
			return ids;
		}, []);

		const togglePage = useCallback(
			(page: WikiTreeType) => {
				setSelectedIds((prevSelected) => {
					const newSelected = new Set(prevSelected);
					const newRemoved = new Set(removalIds);

					const toggleLeaf = (p: WikiTreeType) => {
						if (p.isUpload) {
							if (newRemoved.has(p.id)) {
								newRemoved.delete(p.id);
							} else {
								newRemoved.add(p.id);
							}
						} else {
							if (newSelected.has(p.id)) {
								newSelected.delete(p.id);
							} else {
								newSelected.add(p.id);
							}
						}
					};

					if (page.isFolder) {
						const childLeafIds = getChildLeafIds(page);
						const childLeafs = flattenedData.filter((p) =>
							childLeafIds.includes(p.id),
						);

						const allAreUploaded = childLeafs.every((p) => p.isUpload);
						const anyRemoved = childLeafs.some((p) => newRemoved.has(p.id));

						if (allAreUploaded && anyRemoved) {
							childLeafs.forEach((p) => newRemoved.delete(p.id));
						} else {
							childLeafs.forEach((p) => toggleLeaf(p));
						}
					} else {
						toggleLeaf(page);
					}

					setRemovalIds(newRemoved);
					return newSelected;
				});
			},
			[flattenedData, getChildLeafIds, removalIds],
		);

		useEffect(() => {
			const selectedPages = flattenedData
				.filter((page) => selectedIds.has(page.id) && !page.isUpload)
				.map((page) => page.id);

			const removedPages = flattenedData
				.filter((page) => removalIds.has(page.id) && page.isUpload)
				.map((page) => page.id);

			onUpload(selectedPages);
			onRemove(removedPages);
		}, [selectedIds, removalIds, flattenedData, onUpload, onRemove]);

		const renderPages = useCallback(
			(pages: WikiTreeType[], depth = 0) => {
				return pages.map((page) => {
					const isChecked = page.isFolder
						? getChildLeafIds(page).every((id) => {
								const p = flattenedData.find((p) => p.id === id);
								return p?.isUpload ? !removalIds.has(id) : selectedIds.has(id);
							})
						: page.isUpload
							? !removalIds.has(page.id)
							: selectedIds.has(page.id);

					return (
						<React.Fragment key={page.id}>
							<div
								className={`flex items-center space-x-2 ${removalIds.has(page.id) && "text-red-700"}`}
								style={{ marginLeft: `${depth * 20}px` }}
							>
								<Checkbox
									id={page.id.toString()}
									checked={isChecked}
									onCheckedChange={() => togglePage(page)}
									className={removalIds.has(page.id) && "border-red-700"}
								/>
								<Label htmlFor={page.id.toString()}>{page.title}</Label>
							</div>
							{page.children && renderPages(page.children, depth + 1)}
						</React.Fragment>
					);
				});
			},
			[flattenedData, selectedIds, removalIds, getChildLeafIds, togglePage],
		);

		return <div className="space-y-2">{renderPages(data)}</div>;
	},
);
