"use server";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import config from "@payload-config";
import { getPayload } from "payload";
import HeaderAction from "./HeaderAction";

const CustomHeaderAction = async () => {
	const handleClick = () => {
		// Define the action to be performed on click
		alert("Custom header action triggered!");
	};

	// Fetch posts from the 'posts' collection
	const payload = await getPayload({
		config,
	});
	const tenant = await payload.find({
		collection: "tenant",
		// where: { published: { equals: true } },
	});

	console.log(tenant);

	return <HeaderAction docs={tenant.docs}></HeaderAction>;
	// return (
	//   <button onClick={handleClick}>
	//     Click Me
	//   </button>
	// );
};

export default CustomHeaderAction;
