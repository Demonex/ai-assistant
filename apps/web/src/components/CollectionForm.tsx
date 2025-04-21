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
	FormMessage,
} from "@/components/ui/form.js";
import { Input } from "@/components/ui/input.js";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion.js";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select.js";
import { Textarea } from "./ui/textarea.js";

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
	tenants: TenantProps[];
	neuros: NeuroProps[];
	providers: ProviderProps[];
	onSubmit: (data) => void;
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
	tenantTitle: z.string(),
	title: z
		.string()
		.min(1, { message: "Заполните поле" })
		.refine(
			(value) => {
				return !/^\s|\s$|\s{2,}/.test(value);
			},
			{ message: "Некорректное использование пробелов" },
		),
	description: z
		.string()
		.min(1, { message: "Заполните поле" })
		.refine(
			(value) => {
				return !/^\s|\s$|\s{2,}/.test(value);
			},
			{ message: "Некорректное использование пробелов" },
		),
	embeddingTitle: z.string().min(1, { message: "Выберите значение из списка" }),
	llmTitle: z.string().min(1, { message: "Выберите значение из списка" }),
	rerankerTitle: z.string().min(1, { message: "Выберите значение из списка" }),
	providerTitle: z.string(),
});

export function CollectionForm({
	collection,
	tenants,
	neuros,
	providers,
	onSubmit,
}: CollectionFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: collection?.title || "",
			description:
				collection?.description ||
				"Здравствуйте! Это чат с документами. Вы можете задать вопросы по этим документам, и система постарается найти на них ответы.",
			tenantTitle: collection?.tenant?.title || "",
			embeddingTitle: collection?.embedding?.title || "",
			llmTitle: collection?.llm?.title || "",
			rerankerTitle: collection?.embedding?.title || "",
			providerTitle: providers?.[0].title || "",
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="tenantTitle"
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
							<FormMessage />
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
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* TODO: Потом переделать в массив */}
				<FormField
					control={form.control}
					name="embeddingTitle"
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
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* TODO: Потом переделать в массив */}
				<FormField
					control={form.control}
					name="llmTitle"
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
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* TODO: Потом переделать в массив */}
				<FormField
					control={form.control}
					name="rerankerTitle"
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
							<FormMessage />
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
									name="providerTitle"
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
