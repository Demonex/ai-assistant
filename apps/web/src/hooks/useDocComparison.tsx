import { useMutation } from "@tanstack/react-query";

import { docComparison } from "@/api/doc.js";

export const useDocComparison = () => {
	const { data: docResponse, mutate: handleDocComparison } = useMutation({
		mutationFn: docComparison,
	});

	return { handleDocComparison, docResponse };
};
