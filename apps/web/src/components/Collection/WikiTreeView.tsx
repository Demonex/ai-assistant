import React, { memo, useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox.js";
import type { WikiTreeType } from "@/types/types.js";

type WikiTreeViewProps = {
	data: WikiTreeType[];
	onChange: (selectedPages: WikiTreeType[]) => void;
};

export const WikiTreeView = memo<WikiTreeViewProps>(({ data, onChange }) => {
	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
	const [flattenedData, setFlattenedData] = useState<WikiTreeType[]>([]);

	useEffect(() => {
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

		setFlattenedData(flatten(data));
	}, [data]);

	const getAllChildLeafIds = (page: WikiTreeType): number[] => {
		let ids = [];

		if (page.isFolder && page.children) {
			page.children.forEach((child) => {
				if (!child.isFolder) {
					ids.push(child.id);
				}
				ids = [...ids, ...getAllChildLeafIds(child)];
			});
		}
		return ids;
	};

	const handleCheckboxChange = (page: WikiTreeType, isChecked: boolean) => {
		const newSelectedIds = new Set(selectedIds);

		if (isChecked) {
			if (page.isFolder) {
				const childLeafIds = getAllChildLeafIds(page);
				childLeafIds.forEach((id) => newSelectedIds.add(id));
			} else {
				newSelectedIds.add(page.id);
			}
		} else {
			if (page.isFolder) {
				const childLeafIds = getAllChildLeafIds(page);
				childLeafIds.forEach((id) => newSelectedIds.delete(id));
			} else {
				newSelectedIds.delete(page.id);
			}
		}

		setSelectedIds(newSelectedIds);
	};

	useEffect(() => {
		const selectedLeafPages = flattenedData.filter(
			(page) => selectedIds.has(page.id) && !page.isFolder,
		);
		onChange(selectedLeafPages);
	}, [selectedIds, flattenedData, onChange]);

	const renderPages = (pages: WikiTreeType[], depth = 0) => {
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
					<label
						htmlFor={page.id.toString()}
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						{page.title}
					</label>
				</div>
				{page.children && renderPages(page.children, depth + 1)}
			</React.Fragment>
		));
	};

	return <div className="space-y-2">{renderPages(data)}</div>;
});
