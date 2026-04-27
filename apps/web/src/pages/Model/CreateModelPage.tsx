import { useNavigate } from "react-router";

import { ModelForm } from "@/components/Model/ModelForm.js";
import { Button } from "@/components/ui/button.js";
import { useCreateModel } from "@/hooks/Model/useCreateModel.js";
import { toast } from "@/hooks/use-toast.js";
import { useTenant } from "@/hooks/useTenant.js";
import { ModelRequestType } from "@/types/types.js";

const CreateModelPage = () => {
	const navigate = useNavigate();

	const { tenants } = useTenant();
	const { handleCreateModel } = useCreateModel();

	const onSubmit = (data: ModelRequestType) => {
		handleCreateModel(data, {
			onSuccess: async () => {
				navigate("/models");
				toast({
					title: `Нейросервис ${data.title} успешно обновлен`,
				});
			},
			onError: async (e) => {
				toast({
					variant: "destructive",
					title: "Произошла ошибка при содании нейросервиса",
					description: e.message,
				});
			},
		});
	};

	return (
		tenants && (
			<main className="p-4">
				<div className="text-3xl font-medium mx-6">Новая модель</div>
				<Button className="m-6" onClick={() => navigate(-1)}>
					Назад
				</Button>
				<div className="gap-8 px-8">
					<ModelForm onSubmit={onSubmit} tenants={tenants} />
				</div>
			</main>
		)
	);
};

export default CreateModelPage;
