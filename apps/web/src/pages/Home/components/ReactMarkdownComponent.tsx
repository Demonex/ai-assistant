import type { FC } from "react";
import ReactMarkdown from "react-markdown";

interface ReactMarkdownProps {
	textMarkdown: string;
}
export const ReactMarkdownComponent: FC<ReactMarkdownProps> = ({
	textMarkdown,
}) => {
	return (
		<>
			<style>
				{`
				.markdown-content * { all: revert !important; }
				.markdown-content *:last-child { margin: 0 !important; }
			`}
			</style>
			<ReactMarkdown className="markdown-content" children={textMarkdown} />
		</>
	);
};
