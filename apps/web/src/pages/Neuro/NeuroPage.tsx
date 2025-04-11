import { ColumnNeuro } from "@/components/Neuro/ColumnNeuro.js";
import { DataTableComponent } from "@/components/Table.js";
import { useNeuro } from "@/hooks/useNeuro.js";

const NeuroPage = () => {
	const { neuro } = useNeuro();

	return (
		neuro && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="gap-8 lg:flex">
					<DataTableComponent columns={ColumnNeuro} data={neuro} />
				</div>
			</main>
		)
	);
};

export default NeuroPage;
