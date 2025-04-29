import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox.js";
import { Label } from "@/components/ui/label.js";
import type { WikiTreeType } from "@/types/types.js";

type WikiTreeViewProps = {
	data: WikiTreeType[];
	onChange: (selectedPages: WikiTreeType[]) => void;
};

export const WikiTreeView = memo<WikiTreeViewProps>(({ data, onChange }) => {
	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

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

	const getAllChildLeafIds = useCallback((page: WikiTreeType): number[] => {
		let ids: number[] = [];
		if (page.isFolder && page.children) {
			page.children.forEach((child) => {
				if (!child.isFolder) {
					ids.push(child.id);
				}
				ids.push(...getAllChildLeafIds(child));
			});
		}
		return ids;
	}, []);

	const handleCheckboxChange = useCallback(
		(page: WikiTreeType, isChecked: boolean) => {
			setSelectedIds((prev) => {
				const newSelectedIds = new Set(prev);

				if (isChecked) {
					if (page.isFolder) {
						getAllChildLeafIds(page).forEach((id) => newSelectedIds.add(id));
					} else {
						newSelectedIds.add(page.id);
					}
				} else {
					if (page.isFolder) {
						getAllChildLeafIds(page).forEach((id) => newSelectedIds.delete(id));
					} else {
						newSelectedIds.delete(page.id);
					}
				}

				return newSelectedIds;
			});
		},
		[getAllChildLeafIds],
	);

	useEffect(() => {
		const selectedPages = flattenedData.filter(
			(page) => selectedIds.has(page.id) && !page.isFolder,
		);
		onChange(selectedPages);
	}, [selectedIds, flattenedData, onChange]);

	const renderPages = useCallback(
		(pages: WikiTreeType[], depth = 0) => {
			return pages.map((page) => (
				<React.Fragment key={page.id}>
					<div
						className="flex items-center space-x-2"
						style={{ marginLeft: `${depth * 20}px` }}
					>
						<Checkbox
							id={page.id.toString()}
							checked={
								page.isFolder
									? getAllChildLeafIds(page).every((id) => selectedIds.has(id))
									: selectedIds.has(page.id)
							}
							onCheckedChange={(checked) =>
								handleCheckboxChange(page, checked as boolean)
							}
						/>
						<Label htmlFor={page.id.toString()}>{page.title}</Label>
					</div>
					{page.children && renderPages(page.children, depth + 1)}
				</React.Fragment>
			));
		},
		[selectedIds, handleCheckboxChange, getAllChildLeafIds],
	);

	return <div className="space-y-2">{renderPages(data)}</div>;
});
