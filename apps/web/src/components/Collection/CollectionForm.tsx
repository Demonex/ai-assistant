"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion.js";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.js";
import { Textarea } from "@/components/ui/textarea.js";
import { CollectionFormType } from "@/types/types.js";

import { DropZoneForm } from "./DropZoneForm.js";

const formSchema = z.object({
	tenantTitle: z.string(),
	title: z
		.string()
		.min(1, { message: "Заполните поле" })
		.refine(
			(value) => {
				return value === value.trim();
			},
			{ message: "Некорректное использование пробелов" },
		),
	description: z
		.string()
		.min(1, { message: "Заполните поле" })
		.refine(
			(value) => {
				return value === value.trim();
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
}: CollectionFormType) {
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
					render={({ field }) => (
						<FormItem>
							<FormLabel>Тенант</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger>
									<SelectValue placeholder="Выберите тенант" />
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
					)}
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
					render={({ field }) => {
						let neuro: string | null = null;
						neuros.forEach((item) => {
							if (item.title.toLowerCase().includes("emb")) {
								neuro = item.title;
							}
						});
						return (
							<FormItem>
								<FormLabel>Embedding Нейросервис</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Embedding">{neuro}</SelectValue>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={neuro}>{neuro}</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				{/* TODO: Потом переделать в массив */}
				<FormField
					control={form.control}
					name="llmTitle"
					render={({ field }) => {
						let neuro: string | null = null;
						neuros.forEach((item) => {
							if (item.title.toLowerCase().includes("llm")) {
								neuro = item.title;
							}
						});

						return (
							<FormItem>
								<FormLabel>LLM Нейросервис</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="LLM">{neuro}</SelectValue>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={neuro}>{neuro}</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				{/* TODO: Потом переделать в массив */}
				<FormField
					control={form.control}
					name="rerankerTitle"
					render={({ field }) => {
						let neuro: string | null = null;
						neuros.forEach((item) => {
							if (item.title.toLowerCase().includes("rer")) {
								neuro = item.title;
							}
						});
						return (
							<FormItem>
								<FormLabel>Reranker Нейросервис</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Reranker">{neuro}</SelectValue>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={neuro}>{neuro}</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				{/* TODO: Потом переделать в массив */}
				<FormItem>
					<FormLabel>Провайдеры</FormLabel>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1" className="border my-2 px-4">
							<AccordionTrigger className="bg-gray-100 ">
								<span>Провайдер {providers?.[0]?.id}</span>
							</AccordionTrigger>
							<AccordionContent className="m-6 space-y-4">
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
														<SelectValue placeholder="Provider" />
													</SelectTrigger>
													<SelectContent>
														{providers.map((provider) => (
															<SelectItem value={provider?.title}>
																{provider?.title}
															</SelectItem>
														))}
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
								<DropZoneForm />
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</FormItem>
				<Button type="submit">Сохранить</Button>
			</form>
		</Form>
	);
}
