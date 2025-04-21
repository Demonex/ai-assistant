import { ColumnNeuro } from "@/components/Neuro/ColumnNeuro.js";
import { DataTableComponent } from "@/components/Table.js";
import { useNeuro } from "@/hooks/useNeuro.js";

const UserPage = () => {
	const { neuros } = useNeuro();

	return (
		neuros && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="gap-8 lg:flex">
					<DataTableComponent columns={ColumnNeuro} data={neuros} />
				</div>
			</main>
		)
	);
};

export default UserPage;
