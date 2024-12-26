"use client";

import { useRowLabel } from "@payloadcms/ui";

export const ArrayRowLabel = () => {
	const { data } = useRowLabel<{ collection?: number }>();
	return <div>{`${data.collection || "Collection permissions"}`}</div>;
};
