"use client";

import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import config from "@payload-config";
import { getPayload } from "payload";

import { getCookie, setCookie } from "cookies-next/client";

const HeaderAction = ({ docs }) => {
	const [tenant, setTenant] = useState(getCookie("tenant") || "");

	useEffect(() => {
		tenant && setCookie("tenant", tenant);
	}, [tenant]);

	return (
		<Select
			value={tenant}
			onValueChange={(val) => {
				setTenant(val);
			}}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Tenant" />
			</SelectTrigger>

			<SelectContent>
				{docs.map((doc) => {
					return (
						<SelectItem value={doc.id.toString()} key={doc.id}>
							{doc.title}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
	// return (
	//   <button onClick={handleClick}>
	//     Click Me
	//   </button>
	// );
};

export default HeaderAction;
