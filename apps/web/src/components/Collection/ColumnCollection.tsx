import { Link } from "react-router";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Collection } from "@/types/types.js";

import { Button } from "../ui/button.js";
import { Checkbox } from "../ui/checkbox.js";

export const ColumnCollection: ColumnDef<Collection>[] = [
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
					Коллекция
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const collectionId = row.original.id;
			return (
				<Link to={`/collections/${collectionId}`} className=" cursor-pointer">
					{row.getValue("title")}
				</Link>
			);
		},
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
		cell: ({ row }) => {
			const embedding = row.original.embedding;
			return <div>{embedding?.title || "Не указано"}</div>;
		},
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
		cell: ({ row }) => {
			const llm = row.original.llm;
			return <div>{llm?.title || "Не указано"}</div>;
		},
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
		cell: ({ row }) => {
			const reranker = row.original.reranker;
			return <div>{reranker?.title || "Не указано"}</div>;
		},
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
		cell: ({ row }) => {
			const providers = row.original.providers;
			return providers.map((item) => (
				<span key={item.id}>{item.provider}</span>
			));
		},
	},
];
