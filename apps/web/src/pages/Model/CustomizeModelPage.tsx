import { useNavigate, useParams } from "react-router";

import { ModelForm } from "@/components/Model/ModelForm.js";
import { Button } from "@/components/ui/button.js";
import { useGetModel } from "@/hooks/Model/useGetModel.js";
import { useUpdateModel } from "@/hooks/Model/useUpdateModel.js";
import { toast } from "@/hooks/use-toast.js";
import { useTenant } from "@/hooks/useTenant.js";
import { ModelRequestType } from "@/types/types.js";

const CustomizeNeuroPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { tenants } = useTenant();
	const { model } = useGetModel(+id);
	const { handleUpdateModel } = useUpdateModel(+id);

	const onSubmit = (data: ModelRequestType) => {
		handleUpdateModel(data, {
			onSuccess: async () => {
				navigate("/neuro");
				toast({
					title: `Модель "${data.title}" успешно обновлена`,
				});
			},
			onError: async (e) => {
				console.log(e);
				toast({
					variant: "destructive",
					title: "Произошла ошибка при обновлении модели",
					description: e.message,
				});
			},
		});
	};

	return (
		tenants &&
		model && (
			<main className="p-4">
				<div className="text-3xl font-medium mx-6">{model.title}</div>
				<Button className="m-6" onClick={() => navigate(-1)}>
					Назад
				</Button>
				<div className="gap-8 px-8">
					<ModelForm onSubmit={onSubmit} tenants={tenants} model={model} />
				</div>
			</main>
		)
	);
};

export default CustomizeNeuroPage;
