import { memo, useState } from "react";
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
import {
	CollectionRequestType,
	CollectionType,
	NeuroType,
	PROVIDER_ENUM_TYPE,
	ProviderType,
	TenantType,
} from "@/types/types.js";

import { DropZoneForm } from "./DropZoneForm.js";
import { WikiTreeForm } from "./WikiTreeForm.js";

type CollectionFormProps = {
	collection?: CollectionType;
	tenants: TenantType[];
	neuros: NeuroType[];
	providers: ProviderType[];
	onSubmit: (data: CollectionRequestType) => void;
};

const formSchema = z.object({
	tenantTitle: z.string(),
	title: z
		.string()
		.min(1, { message: "Заполните поле" })
		.refine(
			(value) => {
				return value === value.trim();
			},
			{ message: "Поле не может состоять только из пробелов" },
		),
	description: z
		.string()
		.min(1, { message: "Заполните поле" })
		.refine(
			(value) => {
				return value === value.trim();
			},
			{ message: "Поле не может состоять только из пробелов" },
		),
	embeddingTitle: z.string().min(1, { message: "Выберите значение из списка" }),
	llmTitle: z.string().min(1, { message: "Выберите значение из списка" }),
	rerankerTitle: z.string().min(1, { message: "Выберите значение из списка" }),
	providerElement: z.object({
		id: z.number(),
		settings: z.record(z.unknown()),
		tenant: z.number(),
		title: z.string(),
		type: z.string(),
	}),
});

export const CollectionForm = memo(
	({
		collection,
		tenants,
		neuros,
		providers,
		onSubmit,
	}: CollectionFormProps) => {
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
				rerankerTitle: collection?.reranker?.title || "",
				providerElement:
					providers.find(
						(el) => collection?.providers[0]?.provider === el.id,
					) || {},
			},
		});
		const { setValue } = form;
		const [errorSettings, setErrorSettings] = useState(false);

		const providerElement = form.watch("providerElement");

		const handleSettings = (e) => {
			setErrorSettings(false);

			const text = e.currentTarget.innerText;
			const parsed = JSON.parse(text);

			if (parsed) {
				setValue("providerElement.settings", parsed, { shouldValidate: true });
			}
		};

		const validateSettingsJson = (e) => {
			try {
				JSON.parse(e.currentTarget.innerText);
				setErrorSettings(false);
			} catch (error) {
				console.error(error);
				setErrorSettings(true);
			}
		};

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
							<AccordionItem value="accordion-item" className="border my-2">
								<AccordionTrigger className="bg-gray-100 px-4">
									{providerElement.title}
								</AccordionTrigger>

								<AccordionContent className="m-6 space-y-4">
									<FormField
										control={form.control}
										name="providerElement"
										render={() => (
											<div className="space-y-4">
												<FormItem>
													<FormLabel>Провайдер</FormLabel>

													<Select
														onValueChange={(value) => {
															const selectedProvider = providers.find(
																(p) => p.id.toString() === value,
															);
															if (selectedProvider) {
																form.setValue(
																	"providerElement",
																	selectedProvider,
																);
															}
														}}
														value={providerElement.id.toString()}
													>
														<SelectTrigger>
															<SelectValue placeholder="Провайдер" />
														</SelectTrigger>

														<SelectContent>
															{providers.map((item) => (
																<SelectItem
																	value={item.id.toString()}
																	key={item.id}
																>
																	{item.title}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>

												<FormItem>
													<FormLabel>Настройки провайдера</FormLabel>
													<pre
														className="min-h-[60px] w-full rounded-md border p-3 text-sm font-mono overflow-auto"
														style={{
															wordBreak: "break-word",
															whiteSpace: "pre-wrap",
															wordWrap: "break-word",
														}}
													>
														<code
															className="outline-none"
															contentEditable
															onBlur={validateSettingsJson}
															onInput={handleSettings}
															suppressContentEditableWarning
														>
															{JSON.stringify(
																providerElement.settings ?? {},
																null,
																2,
															)}
														</code>
													</pre>
													{errorSettings && (
														<div className="text-red-600">
															Некорректный JSON
														</div>
													)}
												</FormItem>
											</div>
										)}
									/>
									{providerElement.type === PROVIDER_ENUM_TYPE.minio ? (
										<DropZoneForm />
									) : (
										<WikiTreeForm />
									)}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</FormItem>

					<Button type="submit">Сохранить</Button>
				</form>
			</Form>
		);
	},
);
