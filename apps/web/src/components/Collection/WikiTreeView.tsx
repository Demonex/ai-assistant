import React, { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { SquareArrowOutUpRight } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox.js";
import { Label } from "@/components/ui/label.js";
import type { WikiTreeType } from "@/types/types.js";

type WikiTreeViewProps = {
	data: WikiTreeType[];
	providerUrl: string | unknown;
	onUpload: (selectedPages: number[]) => void;
	onRemove: (selectedPages: number[]) => void;
};

export const WikiTreeView = memo<WikiTreeViewProps>(
	({ data, providerUrl, onUpload, onRemove }) => {
		const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
		const [removalIds, setRemovalIds] = useState<Set<number>>(new Set());

		const flattenedData = useMemo(() => {
			const flatten = (
				pages: WikiTreeType[],
				result: WikiTreeType[] = [],
			): WikiTreeType[] => {
				pages.forEach((page) => {
					result.push(page);
					if (page.children) flatten(page.children, result);
				});
				return result;
			};
			return flatten(data);
		}, [data]);

		const getChildLeafIds = (page: WikiTreeType): number[] => {
			const ids: number[] = [];

			if (page.children) {
				page.children.forEach((child) => {
					if (!child.isFolder) ids.push(child.id);
					ids.push(...getChildLeafIds(child));
				});
			}
			return ids;
		};

		const isChecked = (page: WikiTreeType): boolean => {
			if (page.isFolder) {
				const childLeafIds = getChildLeafIds(page);
				return childLeafIds.every((id) => {
					const p = flattenedData.find((p) => p.id === id);
					return p?.isUpload ? !removalIds.has(id) : selectedIds.has(id);
				});
			}
			return page.isUpload
				? !removalIds.has(page.id)
				: selectedIds.has(page.id);
		};

		const togglePage = (page: WikiTreeType) => {
			setSelectedIds((prevSelected) => {
				const newSelected = new Set(prevSelected);
				const newRemoved = new Set(removalIds);

				if (page.isFolder) {
					const childItems = getAllChildItems(page);
					const shouldSelectAll = !isChecked(page);

					updateChildrenSelection(
						childItems,
						shouldSelectAll,
						newSelected,
						newRemoved,
					);
				} else {
					toggleSingleItem(page, newSelected, newRemoved);
				}

				setRemovalIds(newRemoved);
				return newSelected;
			});
		};

		const getAllChildItems = (folder: WikiTreeType): WikiTreeType[] => {
			const childIds = getChildLeafIds(folder);
			return flattenedData.filter((item) => childIds.includes(item.id));
		};

		const updateChildrenSelection = (
			children: WikiTreeType[],
			select: boolean,
			selectedSet: Set<number>,
			removedSet: Set<number>,
		) => {
			children.forEach((child) => {
				if (child.isUpload) {
					if (select) {
						removedSet.delete(child.id);
					} else {
						removedSet.add(child.id);
					}
				} else {
					if (select) {
						selectedSet.add(child.id);
					} else {
						selectedSet.delete(child.id);
					}
				}
			});
		};

		const toggleSingleItem = (
			item: WikiTreeType,
			selectedSet: Set<number>,
			removedSet: Set<number>,
		) => {
			if (item.isUpload) {
				if (removedSet.has(item.id)) {
					removedSet.delete(item.id);
				} else {
					removedSet.add(item.id);
				}
			} else {
				if (selectedSet.has(item.id)) {
					selectedSet.delete(item.id);
				} else {
					selectedSet.add(item.id);
				}
			}
		};

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

		useEffect(() => {
			const updatedSelected = new Set(selectedIds);
			const updatedRemoval = new Set(removalIds);

			flattenedData.forEach((page) => {
				if (page.isUpload) updatedSelected.delete(page.id);
				else updatedRemoval.delete(page.id);
			});

			setSelectedIds(updatedSelected);
			setRemovalIds(updatedRemoval);
		}, [flattenedData]);

		const renderPages = (pages: WikiTreeType[], depth = 0) => {
			return pages.map((page) => (
				<React.Fragment key={page.id}>
					<div
						className={`flex items-center space-x-2 ${removalIds.has(page.id) ? "text-red-700" : ""}`}
						style={{ marginLeft: `${depth * 20}px` }}
					>
						<Checkbox
							id={page.id.toString()}
							checked={isChecked(page)}
							onCheckedChange={() => togglePage(page)}
							className={removalIds.has(page.id) ? "border-red-700" : ""}
						/>
						<Label htmlFor={page.id.toString()}>{page.title}</Label>
						<Link target="_blank" to={`${providerUrl}/${page.path}`}>
							<SquareArrowOutUpRight size={12} />
						</Link>
					</div>
					{page.children && renderPages(page.children, depth + 1)}
				</React.Fragment>
			));
		};

		return <div className="space-y-2">{renderPages(data)}</div>;
	},
);
