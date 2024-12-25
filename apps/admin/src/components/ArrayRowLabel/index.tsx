"use client";

import { useRowLabel } from "@payloadcms/ui";

export const ArrayRowLabel = () => {
	const { data, rowNumber } = useRowLabel<{ collection?: number }>();
	console.log(data, rowNumber);

	return <div>{`${data.collection || "Collection permissions"}`}</div>;
};
