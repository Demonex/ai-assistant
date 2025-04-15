"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button.js";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form.js";
import { Input } from "@/components/ui/input.js";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./accordion.js";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select.js";
import { Textarea } from "./textarea.js";

//TODO: переписать типы
interface CollectionFormProps {
	collection?: {
		title?: string;
		tenant?: {
			title: string;
		};
		description?: string;
		embedding?: {
			title: string;
		};
		llm?: {
			title: string;
		};
		reranker?: {
			title: string;
		};
	};
	tenants?: TenantProps[];
	neuros?: NeuroProps[];
	providers?: ProviderProps[];
}

interface TenantProps {
	title: string;
	id: number;
}

interface NeuroProps {
	id: number;
	title: string;
}

interface ProviderProps {
	id: number;
	title: string;
}

const formSchema = z.object({
	tenant: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	title: z.string(),
	description: z.string(),
	embedding: z.string(),
	llm: z.string(),
	reranker: z.string(),
	provider: z.string(),
});

export function CollectionForm({
	collection,
	tenants,
	neuros,
	providers,
}: CollectionFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: collection?.title || "",
			description: collection?.description || "",
			tenant: collection?.tenant?.title || "",
			embedding: collection?.embedding?.title || "",
			llm: collection?.llm?.title || "",
			reranker: collection?.embedding?.title || "",
			provider: providers?.[0].title || "",
		},
	});

	const onSubmit = (e) => {
		console.log(e);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="tenant"
					render={({ field }) => {
						const selectedTenant = tenants?.find(
							(tenant) => tenant.title === field.value,
						);
						return (
							<FormItem>
								<FormLabel>Тенант</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Выберите тенант">
											{selectedTenant?.title}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										{tenants?.map((tenant) => (
											<SelectItem key={tenant.id} value={tenant.title}>
												{tenant.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название коллекции</FormLabel>
							<FormControl>
								<Input placeholder="title" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Описание коллекции</FormLabel>
							<Textarea
								name="description"
								placeholder="Type your message here."
								{...field}
							/>
						</FormItem>
					)}
				/>
				{/* TODO: Потом переделать в массив */}
				<FormField
					control={form.control}
					name="embedding"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Embedding Нейросервис</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger>
									<SelectValue placeholder="Embedding">
										{neuros?.[1]?.title}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={neuros?.[1]?.title}>
										{neuros?.[1]?.title}
									</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				{/* TODO: Потом переделать в массив */}
				<FormField
					control={form.control}
					name="llm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>LLM Нейросервис</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger>
									<SelectValue placeholder="LLM" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={neuros?.[0].title}>
										{neuros?.[0].title}
									</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				{/* TODO: Потом переделать в массив */}
				<FormField
					control={form.control}
					name="reranker"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reranker Нейросервис</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger>
									<SelectValue placeholder="Reranker">
										{neuros?.[2].title}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={neuros?.[2].title}>
										{neuros?.[2].title}
									</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				{/* TODO: Потом переделать в массив */}
				<FormItem>
					<FormLabel>Провайдеры</FormLabel>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1" className="border my-2 ">
							<AccordionTrigger className="bg-gray-100 ">
								<span className="mx-4">Провайдер {providers?.[0]?.id}</span>
							</AccordionTrigger>
							<AccordionContent className="m-6">
								<FormField
									control={form.control}
									name="provider"
									render={({ field }) => (
										<div className="space-y-4">
											<FormItem>
												<FormLabel>Провайдер</FormLabel>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="Provider">
															{providers?.[0].title}
														</SelectValue>
													</SelectTrigger>
													<SelectContent>
														<SelectItem value={providers?.[0].title}>
															{providers?.[0].title}
														</SelectItem>
													</SelectContent>
												</Select>
											</FormItem>
											<FormItem>
												<FormLabel>Настройки провайдера</FormLabel>
												<Textarea name="settings" />
											</FormItem>
										</div>
									)}
								/>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</FormItem>
				<Button type="submit">Сохранить</Button>
			</form>
		</Form>
	);
}
