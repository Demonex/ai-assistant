import ChevronRight from "../../../assets/ChevronRight.js";
import React, { memo } from "react";
import { Link } from "wouter";

const PathToArticle = memo(() => {
	return (
		<div className="w-full py-10 flex items-center gap-3 justify-start flex-wrap">
			<Link to="/">
				<p className="text-captionText hover:text-medium_grey cursor-pointer">
					Главная
				</p>
			</Link>
			<ChevronRight className="fill-medium_grey max-w-3 max-h-3" />
			<Link to="/media">
				<p className="text-captionText hover:text-medium_grey cursor-pointer">
					Медиа
				</p>
			</Link>
			<ChevronRight className="fill-medium_grey max-w-3 max-h-3" />
			<p className="text-captionText text-medium_grey">
				Как снимали клип Daft Punk — Around the World
			</p>
		</div>
	);
});
export default PathToArticle;
