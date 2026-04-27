import { type FC } from "react";
import ReactMarkdown from "react-markdown";

import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type ReactMarkdownProps = {
	textMarkdown: string;
};

export const ReactMarkdownComponent: FC<ReactMarkdownProps> = ({
	textMarkdown,
}) => {
	return (
		<>
			<style>
				{`
          .markdown-content * { all: revert !important; }
          .markdown-content *:last-child { margin: 0 !important; }
          .markdown-content table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
          }
          .markdown-content th, .markdown-content td {
            border: 1px solid #ddd;
            padding: 8px;
            vertical-align: top;
          }
          .markdown-content th {
            background-color: #f2f2f2;
          }
        `}
			</style>
			<ReactMarkdown
				className="markdown-content"
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				children={textMarkdown}
			/>
		</>
	);
};
