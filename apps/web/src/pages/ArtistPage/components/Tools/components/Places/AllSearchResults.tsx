import React, { memo } from "react";
import { useGetPlaces } from "../../../../hooks/useGetPlaces.js";
import GlobeIcon from "../../../../../../assets/GlobeIcon.js";

const AllSearchResults = memo(() => {
	const { valueAllResults, searchDataAllResults, setRenderResultContent } =
		useGetPlaces();
	return (
		<div className="w-full ">
			<div className="py-4">
				<p className="text-t2Regular text-light_grey">
					Результаты поиска по запросу «{valueAllResults.value}» :{" "}
					{valueAllResults.length}
				</p>
			</div>
			<div className="py-4 flex gap-6 ">
				<div className="w-full flex flex-row-reverse justify-between">
					{searchDataAllResults?.results.map((type, index) => (
						<ul
							key={index}
							className="flex flex-col gap-4 w-full max-w-[35rem]"
						>
							<h2 className="text-caption_m_desk capitalize">
								{type.type}{" "}
								<span className="text-caption_r_desk text-medium_grey">
									({type.data.length})
								</span>
							</h2>
							{type.data.map((item, indexItem) =>
								item.type === "city" ? (
									<div
										className="py-3 px-4 bg-[#27272780] rounded-xl flex justify-between w-full gap-12"
										key={indexItem}
									>
										<div className="flex gap-2 items-center">
											<GlobeIcon className="fill-yellow w-11" />
											<p className="text-t2Regular">
												{item.name.split(",").shift()}
											</p>
										</div>
									</div>
								) : (
									<li
										onClick={() => setRenderResultContent("detailed")}
										key={indexItem}
										className={`py-3 px-5 w-full flex gap-4  ${type.type === "artist" ? "border-b border-secondary_dark_gray" : ""}`}
									>
										<img
											src={item.imageUrl}
											alt=""
											className="w-11 h-11 rounded-full"
										/>
										<div>
											<h1 className="text-caption_r_desk">{item.name}</h1>
											<p className="capitalize text-caption_s_desk text-medium_grey mt-0.5">
												{item.type}
											</p>
										</div>
									</li>
								),
							)}
						</ul>
					))}
				</div>
			</div>
		</div>
	);
});
export default AllSearchResults;
