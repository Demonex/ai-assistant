import { useNavigate } from "react-router";

import { CollectionForm } from "@/components/ui/CollectionForm.js";
import { Button } from "@/components/ui/button.js";
import { useNeuro } from "@/hooks/useNeuro.js";
import { useTenant } from "@/hooks/useTenant.js";

const CreateNewCollectionPage = () => {
	const navigate = useNavigate();

	const { tenants } = useTenant();
	const { neuros } = useNeuro();

	return (
		tenants &&
		neuros && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="text-3xl font-medium mx-6">Новая коллекция</div>
				<Button className="m-6" onClick={() => navigate(-1)}>
					Назад
				</Button>
				<div className="gap-8 px-8">
					<CollectionForm tenants={tenants} neuros={neuros} />
				</div>
			</main>
		)
	);
};

export default CreateNewCollectionPage;
