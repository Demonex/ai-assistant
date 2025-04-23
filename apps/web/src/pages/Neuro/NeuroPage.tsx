import { useNavigate } from "react-router";

import { ColumnNeuro } from "@/components/Neuro/ColumnNeuro.js";
import { DataTableComponent } from "@/components/Table.js";
import { Button } from "@/components/ui/button.js";
import { useGetNeuros } from "@/hooks/Neuro/useGetNeuros.js";

const NeuroPage = () => {
	const navigate = useNavigate();

	const { neuros } = useGetNeuros();

	return (
		neuros && (
			<main className="p-4">
				<div className="text-3xl font-medium ">Нейросервисы</div>
				<div className="flex justify-between items-center">
					<Button className="my-6" onClick={() => navigate("/neuro/new-neuro")}>
						Создать
					</Button>
				</div>
				<div className="gap-8 lg:flex">
					<DataTableComponent columns={ColumnNeuro} data={neuros} />
				</div>
			</main>
		)
	);
};

export default NeuroPage;
