import { useNavigate, useParams } from "react-router";

import { CollectionForm } from "@/components/ui/CollectionForm.js";
import { Button } from "@/components/ui/button.js";
import { useCollection } from "@/hooks/Collection/useCollection.js";

const CustomizeCollectionPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { collection } = useCollection(id);
	return (
		collection && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="text-3xl font-medium mx-6">{collection.title}</div>
				<Button className="m-6" onClick={() => navigate(-1)}>
					Назад
				</Button>
				<div className="gap-8 px-8">
					<CollectionForm collection={collection} />
				</div>
			</main>
		)
	);
};

export default CustomizeCollectionPage;
