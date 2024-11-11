import type { ReactNode } from 'react';

interface FormContainerProps {
	children: ReactNode;
}

export const FormContainer = ({ children }: FormContainerProps) => {
	return (
		<div
            className="p-0 md:p-10 shadow rounded-2xl  md:bg-popup_gray w-full flex flex-col gap-4 md:gap-5 mb-[7.5rem] lg:mb-[unset]"
		>
			{children}	
		</div>
	);
}