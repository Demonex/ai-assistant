import { ColumnCollection } from "@/components/Collection/ColumnCollection.js";
import { DataTableComponent } from "@/components/Table.js";
import { useCollection } from "@/hooks/useCollection.js";

const CollectionPage = () => {
	const { collections } = useCollection();
	return (
		collections && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="gap-8 lg:flex">
					<DataTableComponent columns={ColumnCollection} data={collections} />
				</div>
			</main>
		)
	);
};

export default CollectionPage;
