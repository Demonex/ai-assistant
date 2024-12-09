import { ReactNode } from 'react';

interface ModalActionsProps {
	children: ReactNode;
}

export const ModalActions = (props: ModalActionsProps) => {
	const { children } = props;

	return (
		<div className="w-full flex justify-end flex-col md:flex-row gap-4">
			{children}
		</div>
	);
};
