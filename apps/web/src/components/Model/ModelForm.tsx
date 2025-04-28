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
import { ModelRequestType, ModelType, TenantType } from "@/types/types.js";

type ModelFormProps = {
	model?: ModelType;
	tenants: TenantType[];
	onSubmit: (data: ModelRequestType) => void;
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
	tenant: z.string().min(1, { message: "Выберите значение из списка" }),
	type: z.string().min(1, { message: "Выберите значение из списка" }),
});

export const ModelForm = memo<ModelFormProps>(
	({ onSubmit, tenants, model }) => {
		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				title: model?.title || "",
				tenant: model?.tenant?.title || "",
				type: model?.type || "",
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
								<FormLabel>Название модели</FormLabel>
								<FormControl>
									<Input placeholder="title" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tenant"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Тенант</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Выберите тенант" />
									</SelectTrigger>
									<SelectContent>
										{tenants.map((tenant) => (
											<SelectItem key={tenant.id} value={tenant.title}>
												{tenant.title}
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
						name="type"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Тип модели</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Выберите тип модель" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="llm">llm</SelectItem>
											<SelectItem value="embedding">embedding</SelectItem>
											<SelectItem value="reranker">reranker</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<Button type="submit">Сохранить</Button>
				</form>
			</Form>
		);
	},
);
