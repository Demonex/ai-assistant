import { ColumnModel } from "@/components/Model/ColumnModel.js";
import { DataTableComponent } from "@/components/Table.js";
import { useModel } from "@/hooks/useModel.js";

const ModelPage = () => {
	const { models } = useModel();

	console.log(models);

	return (
		models && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="gap-8 lg:flex">
					<DataTableComponent columns={ColumnModel} data={models} />
				</div>
			</main>
		)
	);
};

export default ModelPage;
