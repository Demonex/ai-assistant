import { Link } from "react-router";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Payment } from "@/types/types.js";

import { Button } from "../ui/button.js";
import { Checkbox } from "../ui/checkbox.js";

export const ColumnCollection: ColumnDef<Payment>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
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
					Коллекция
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<Link to={"/collections/collection"} className="lowercase cursor-pointer">
				{row.getValue("title")}
			</Link>
		),
	},
	{
		accessorKey: "embedding",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Embedding Нейросервис
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("embedding")}</div>
		),
	},
	{
		accessorKey: "llm",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					LLM Нейросервис
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue("llm")}</div>,
	},
	{
		accessorKey: "reranker",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Reranker Нейросервис
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("reranker")}</div>
		),
	},
	{
		accessorKey: "providers",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Провайдеры
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("providers")}</div>
		),
	},
];
