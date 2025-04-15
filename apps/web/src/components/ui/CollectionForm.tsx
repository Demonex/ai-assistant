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

const formSchema = z.object({
	tenant: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	name: z.string(),
	description: z.string(),
	embedding: z.string(),
	llm: z.string(),
	reranker: z.string(),
});

export function CollectionForm({ collection }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			tenant: collection.tenant.title,
		},
	});

	const onSubmit = () => {
		console.log("клик");
	};

	console.log(collection);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="tenant"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Тенант</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									value={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Выберите тенант" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Тенант1</SelectItem>
										<SelectItem value="dark">Тенант2</SelectItem>
										<SelectItem value="system">Тенант3</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
							<FormItem>
								<FormLabel>Название коллекции</FormLabel>
								<FormControl>
									<Input placeholder="shadcn" {...field} />
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel>Описание коллекции</FormLabel>
								<Textarea
									name="description"
									placeholder="Type your message here."
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Embedding Нейросервис</FormLabel>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Embedding" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Embedding1</SelectItem>
										<SelectItem value="dark">Embedding2</SelectItem>
										<SelectItem value="system">Embedding3</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
							<FormItem>
								<FormLabel>LLM Нейросервис</FormLabel>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="LLM" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">LLM1</SelectItem>
										<SelectItem value="dark">LLM2</SelectItem>
										<SelectItem value="system">LLM3</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
							<FormItem>
								<FormLabel>Reranker Нейросервис</FormLabel>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Reranker" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Reranker1</SelectItem>
										<SelectItem value="dark">Reranker2</SelectItem>
										<SelectItem value="system">Reranker3</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
							<FormItem>
								<FormLabel>Провайдеры</FormLabel>
								<Accordion type="single" collapsible>
									<AccordionItem value="item-1">
										<AccordionTrigger>Is it accessible?</AccordionTrigger>
										<AccordionContent>
											Yes. It adheres to the WAI-ARIA design pattern.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-2">
										<AccordionTrigger>Is it styled?</AccordionTrigger>
										<AccordionContent>
											Yes. It comes with default styles that matches the other
											components&apos; aesthetic.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-3">
										<AccordionTrigger>Is it animated?</AccordionTrigger>
										<AccordionContent>
											Yes. It's animated by default, but you can disable it if
											you prefer.
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</FormItem>
						</>
					)}
				/>
				<Button type="submit">Сохранить</Button>
			</form>
		</Form>
	);
}
