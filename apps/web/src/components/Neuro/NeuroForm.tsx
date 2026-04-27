import { memo } from "react";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.js";
import { Textarea } from "@/components/ui/textarea.js";
import { ModelType, NeuroRequestType, NeuroType } from "@/types/types.js";

type NeuroFormProps = {
	neuro?: NeuroType;
	models: ModelType[];
	onSubmit: (data: NeuroRequestType) => void;
};

const formSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Заполните поле" })
		.refine(
			(value) => {
				return value === value.trim();
			},
			{ message: "Некорректное использование пробелов" },
		),
	model: z.string().min(1, { message: "Выберите значение из списка" }),
	settings: z.string().optional(),
});

export const NeuroForm = memo<NeuroFormProps>(({ onSubmit, models, neuro }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: neuro?.title || "",
			model: neuro?.model?.title || "",
			settings: neuro?.modelSettings || "",
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название нейросервиса</FormLabel>
							<FormControl>
								<Input placeholder="title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="model"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Модель</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger>
									<SelectValue placeholder="Выберите нейросервис" />
								</SelectTrigger>
								<SelectContent>
									{models?.map((model) => (
										<SelectItem key={model.id} value={model.title}>
											{model.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="settings"
					render={() => (
						<div className="space-y-4">
							<FormItem>
								<FormLabel>Настройки нейросервиса</FormLabel>
								<Textarea name="settings" />
							</FormItem>
						</div>
					)}
				/>
				<Button type="submit">Сохранить</Button>
			</form>
		</Form>
	);
});
