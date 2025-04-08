import { CollectionForm } from "@/components/ui/CollectionForm.js";

const CustomizeCollectionPage = () => {
	return (
		<>
			<main className="p-4 bg-[#fbfbfb]">
				<div className="gap-8 px-8">
					<div className="text-3xl font-medium mb-6">Какая-то коллекция</div>
					<CollectionForm />
				</div>
			</main>
		</>
	);
};

export default CustomizeCollectionPage;
