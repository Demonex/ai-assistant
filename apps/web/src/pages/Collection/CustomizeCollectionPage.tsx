import { useNavigate, useParams } from "react-router";

import { CollectionForm } from "@/components/ui/CollectionForm.js";
import { Button } from "@/components/ui/button.js";
import { useCollection } from "@/hooks/Collection/useCollection.js";
import { useNeuro } from "@/hooks/useNeuro.js";
import { useProvider } from "@/hooks/useProviders.js";
import { useTenant } from "@/hooks/useTenant.js";

const CustomizeCollectionPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { collection } = useCollection(+id);
	const { tenants } = useTenant();
	const { neuros } = useNeuro();
	const { providers } = useProvider();

	return (
		collection &&
		tenants &&
		neuros &&
		providers && (
			<main className="p-4 bg-[#fbfbfb]">
				<div className="text-3xl font-medium mx-6">{collection.title}</div>
				<Button className="m-6" onClick={() => navigate(-1)}>
					Назад
				</Button>
				<div className="gap-8 px-8">
					<CollectionForm
						collection={collection}
						tenants={tenants}
						neuros={neuros}
						providers={providers}
					/>
				</div>
			</main>
		)
	);
};

export default CustomizeCollectionPage;
