import { Link } from "react-router";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { CollectionType } from "@/types/types.js";

import { Button } from "../ui/button.js";
import { Checkbox } from "../ui/checkbox.js";

export const ColumnModel: ColumnDef<CollectionType>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected()
						? true
						: table.getIsSomePageRowsSelected()
							? "indeterminate"
							: false
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Название модели
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const modelId = row.original.id;
			return (
				<Link
					target="_blank"
					to={`/models/${modelId}`}
					className=" cursor-pointer"
				>
					{row.getValue("title")}
				</Link>
			);
		},
	},
	{
		accessorKey: "type",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Тип модели
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div>{row.getValue("type")}</div>,
	},
];
