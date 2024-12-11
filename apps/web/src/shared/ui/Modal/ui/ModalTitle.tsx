import { Dialog } from "@headlessui/react";
import type { ReactNode } from "react";

interface ModalTitleProps {
	children: ReactNode;
}

export const ModalTitle = (props: ModalTitleProps) => {
	const { children } = props;

	return (
		<Dialog.Title className="text-t1Semi_deck text-left mb-5">
			{children}
		</Dialog.Title>
	);
};
