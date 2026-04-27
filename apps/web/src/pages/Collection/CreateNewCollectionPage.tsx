import { useNavigate } from "react-router";

import { CollectionForm } from "@/components/Collection/CollectionForm.js";
import { Button } from "@/components/ui/button.js";
import { useCreateCollection } from "@/hooks/Collection/useCreateCollection.js";
import { useGetNeuros } from "@/hooks/Neuro/useGetNeuros.js";
import { toast } from "@/hooks/use-toast.js";
import { useProvider } from "@/hooks/useProviders.js";
import { useTenant } from "@/hooks/useTenant.js";
import { CollectionRequestType } from "@/types/types.js";

const CreateNewCollectionPage = () => {
	const navigate = useNavigate();

	const { tenants } = useTenant();
	const { neuros } = useGetNeuros();
	const { providers } = useProvider();
	const { handleCreateCollection } = useCreateCollection();

	const onSubmit = (data: CollectionRequestType) => {
		handleCreateCollection(data, {
			onSuccess: async () => {
				navigate("/collections");
				toast({
					title: `Коллекция ${data.title} успешно создана`,
				});
			},
			onError: async (e) => {
				toast({
					variant: "destructive",
					title: "Произошла ошибка при содании коллекции",
					description: e.message,
				});
			},
		});
	};

	return (
		tenants &&
		neuros && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="text-3xl font-medium mx-6">Новая коллекция</div>
				<Button className="m-6" onClick={() => navigate(-1)}>
					Назад
				</Button>
				<div className="gap-8 px-8">
					<CollectionForm
						tenants={tenants}
						neuros={neuros}
						providers={providers}
						onSubmit={onSubmit}
					/>
				</div>
			</main>
		)
	);
};

export default CreateNewCollectionPage;
