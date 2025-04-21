import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ColumnCollection } from "@/components/Collection/ColumnCollection.js";
import { DataTableComponent } from "@/components/Table.js";
import { Button } from "@/components/ui/button.js";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.js";
import { useCollections } from "@/hooks/Collection/useCollections.js";
import { useTenant } from "@/hooks/useTenant.js";

const CollectionPage = () => {
	const navigate = useNavigate();
	const { tenants } = useTenant();
	const [selectedTenantId, setSelectedTenantId] = useState(null);

	useEffect(() => {
		if (tenants && tenants.length > 0) {
			setSelectedTenantId(tenants[0].id);
		}
	}, [tenants]);

	const { collections } = useCollections(selectedTenantId);

	const handleTenantSelect = (value: string) => {
		setSelectedTenantId(value);
	};

	return (
		collections &&
		tenants && (
			<main className="p-4">
				<div className="text-3xl font-medium ">Коллекции</div>
				<div className="flex justify-between items-center">
					<Button
						className="my-6"
						onClick={() => navigate("/collections/new-collection")}
					>
						Создать
					</Button>
					<div className="flex justify-center">
						<Select onValueChange={handleTenantSelect} value={selectedTenantId}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Тенант" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Теннаты</SelectLabel>
									{tenants.map((tenant) => (
										<SelectItem key={tenant.id} value={tenant.id}>
											{tenant.title}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="gap-8 lg:flex">
					<DataTableComponent columns={ColumnCollection} data={collections} />
				</div>
			</main>
		)
	);
};

export default CollectionPage;
