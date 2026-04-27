import { useNavigate } from "react-router";

import { NeuroForm } from "@/components/Neuro/NeuroForm.js";
import { Button } from "@/components/ui/button.js";
import { useGetModels } from "@/hooks/Model/useGetModels.js";
import { useCreateNeuro } from "@/hooks/Neuro/useCreateNeuro.js";
import { toast } from "@/hooks/use-toast.js";
import { NeuroRequestType } from "@/types/types.js";

const CreateNeuroPage = () => {
	const navigate = useNavigate();

	const { models } = useGetModels();
	const { handleCreateNeuro } = useCreateNeuro();

	const onSubmit = (data: NeuroRequestType) => {
		handleCreateNeuro(data, {
			onSuccess: async () => {
				navigate("/neuro");
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
		models && (
			<main className="p-4">
				<div className="text-3xl font-medium mx-6">Новый нейросервис</div>
				<Button className="m-6" onClick={() => navigate(-1)}>
					Назад
				</Button>
				<div className="gap-8 px-8">
					<NeuroForm models={models} onSubmit={onSubmit} />
				</div>
			</main>
		)
	);
};

export default CreateNeuroPage;
