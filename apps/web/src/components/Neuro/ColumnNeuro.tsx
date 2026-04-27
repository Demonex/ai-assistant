import { Link } from "react-router";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { NeuroType } from "@/types/types.js";

import { Button } from "../ui/button.js";
import { Checkbox } from "../ui/checkbox.js";

export const ColumnNeuro: ColumnDef<NeuroType>[] = [
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
					Нейросервис
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const neuroId = row.original.id;
			return (
				<Link to={`/neuro/${neuroId}`} className=" cursor-pointer">
					{row.getValue("title")}
				</Link>
			);
		},
	},
	{
		accessorKey: "model",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Модель
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const modelTitle = row.original.model.title;
			return <div>{modelTitle}</div>;
		},
	},
	{
		accessorKey: "modelSettings",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Настройка модели
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div>{row.getValue("modelSettings") || "No settings"}</div>
		),
	},
];
