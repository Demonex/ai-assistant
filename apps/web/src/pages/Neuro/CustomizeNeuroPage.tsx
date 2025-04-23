import { useNavigate, useParams } from "react-router";

import { NeuroForm } from "@/components/Neuro/NeuroForm.js";
import { Button } from "@/components/ui/button.js";
import { useGetNeuro } from "@/hooks/Neuro/useGetNeuro.js";
import { useUpdateNeuro } from "@/hooks/Neuro/useUpdateNeuro.js";
import { toast } from "@/hooks/use-toast.js";
import { useModel } from "@/hooks/useModel.js";
import { NeuroRequestType } from "@/types/types.js";

const CustomizeNeuroPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { neuro } = useGetNeuro(+id);
	const { handleUpdateNeuro } = useUpdateNeuro(+id);
	const { models } = useModel();

	const onSubmit = (data: NeuroRequestType) => {
		handleUpdateNeuro(data, {
			onSuccess: async () => {
				navigate("/neuro");
				toast({
					title: `Нейросервис "${data.title}" успешно обновлен`,
				});
			},
			onError: async (e) => {
				console.log(e);
				toast({
					variant: "destructive",
					title: "Произошла ошибка при обновлении нейросервиса",
					description: e.message,
				});
			},
		});
	};

	return (
		neuro &&
		models && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="text-3xl font-medium mx-6">{neuro.title}</div>
				<Button className="m-6" onClick={() => navigate(-1)}>
					Назад
				</Button>
				<div className="gap-8 px-8">
					<NeuroForm neuro={neuro} models={models} onSubmit={onSubmit} />
				</div>
			</main>
		)
	);
};

export default CustomizeNeuroPage;
