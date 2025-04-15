import { useNavigate } from "react-router";

import { ColumnCollection } from "@/components/Collection/ColumnCollection.js";
import { DataTableComponent } from "@/components/Table.js";
import { Button } from "@/components/ui/button.js";
import { useCollections } from "@/hooks/Collection/useCollections.js";

const CollectionPage = () => {
	const navigate = useNavigate();
	const { collections } = useCollections();

	return (
		collections && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="text-3xl font-medium ">Коллекции</div>
				<Button
					className="my-6"
					onClick={() => navigate("/collections/new-collection")}
				>
					Создать
				</Button>
				<div className="gap-8 lg:flex">
					<DataTableComponent columns={ColumnCollection} data={collections} />
				</div>
			</main>
		)
	);
};

export default CollectionPage;
