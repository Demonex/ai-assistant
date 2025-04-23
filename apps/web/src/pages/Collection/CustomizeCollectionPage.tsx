import { useNavigate, useParams } from "react-router";

import { CollectionForm } from "@/components/CollectionForm.js";
import { Button } from "@/components/ui/button.js";
import { useCollection } from "@/hooks/Collection/useCollection.js";
import { useUpdateCollection } from "@/hooks/Collection/useUpdateCollection.js";
import { useGetNeuros } from "@/hooks/Neuro/useGetNeuros.js";
import { toast } from "@/hooks/use-toast.js";
import { useProvider } from "@/hooks/useProviders.js";
import { useTenant } from "@/hooks/useTenant.js";
import { CollectionRequestType } from "@/types/types.js";

const CustomizeCollectionPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { collection } = useCollection(+id);
	const { tenants } = useTenant();
	const { neuros } = useGetNeuros();
	const { providers } = useProvider();
	const { handleUpdateCollection } = useUpdateCollection(+id);

	const onSubmit = (data: CollectionRequestType) => {
		handleUpdateCollection(data, {
			onSuccess: async () => {
				navigate("/collections");
				toast({
					title: `Коллекция "${data.title}" успешно обновлена`,
				});
			},
			onError: async (e) => {
				toast({
					variant: "destructive",
					title: "Произошла ошибка при обновлении коллекции",
					description: e.message,
				});
			},
		});
	};

	return (
		collection &&
		tenants &&
		neuros &&
		providers && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="text-3xl font-medium mx-6">{collection.title}</div>
				<Button className="m-6" onClick={() => navigate(-1)}>
					Назад
				</Button>
				<div className="gap-8 px-8">
					<CollectionForm
						collection={collection}
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

export default CustomizeCollectionPage;
