import type { ReactNode } from "react";

interface ModalCommentProps {
	children: ReactNode;
}

export const ModalComment = (props: ModalCommentProps) => {
	const { children } = props;

	return (
		<div className="my-5">
			<p className="text-caption_r_desk text-medium_grey pb-4">{children}</p>
		</div>
	);
};
