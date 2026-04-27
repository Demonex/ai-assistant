import { useNavigate } from "react-router";

import { ColumnModel } from "@/components/Model/ColumnModel.js";
import { DataTableComponent } from "@/components/Table.js";
import { Button } from "@/components/ui/button.js";
import { useGetModels } from "@/hooks/Model/useGetModels.js";

const ModelPage = () => {
	const navigate = useNavigate();

	const { models } = useGetModels();

	return (
		models && (
			<main className="p-4">
				<div className="text-3xl font-medium ">Модели</div>
				<div className="flex justify-between items-center">
					<Button
						className="my-6"
						onClick={() => navigate("/models/new-model")}
					>
						Создать
					</Button>
				</div>
				<div className="gap-8 lg:flex">
					<DataTableComponent columns={ColumnModel} data={models} />
				</div>
			</main>
		)
	);
};

export default ModelPage;
