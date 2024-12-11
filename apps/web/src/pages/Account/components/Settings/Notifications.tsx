import React, { memo } from "react";
import { ListBox } from "./FavoriteSources.js";
import SecondaryButton from "../../../../components/SecondaryButton.js";
import { StarIcon } from "../../../../assets/StarIcon.js";
import BasketIcon from "../../../../assets/BasketIcon.js";
import { navbar } from "../../../../data/consts/navbar.js";

const Notifications = memo(() => {
	const sources = navbar[0].content[0].options;
	return (
		<>
			<h1 className="text-t1Semi_ipad lg:hidden">Уведомления</h1>
			<section className="py-6 flex flex-col gap-6">
				<div className="w-full max-w-[35rem]">
					<ListBox />
				</div>
				<div className="flex gap-4 items-center px-4">
					<input
						// onClick={() => onUpdateSubscription(item)}
						type="checkbox"
						className="bg-transparent border border-solid border-secondary_dark_gray rounded-sm"
						// defaultChecked={item.renew}
					/>
					<p className="text-t2Regular text-light_grey">Выбрать все</p>
				</div>
				<ul className=" flex flex-col">
					{sources.map((source, index) => (
						<li
							key={index}
							className="py-4 px-4 flex justify-between items-center border-b border-secondary_dark_gray w-full lg:max-w-[35rem]"
						>
							<div className="flex items-center gap-4">
								<input
									// onClick={() => onUpdateSubscription(item)}
									type="checkbox"
									className="bg-transparent border border-solid border-secondary_dark_gray rounded-sm"
									// defaultChecked={item.renew}
								/>
								<div className="flex items-center gap-2.5">
									<img
										src={source.logo}
										alt={source.name}
										className="w-5 h-5"
									/>
									<p className="text-t2Regular">{source.name}</p>
								</div>
							</div>
						</li>
					))}
				</ul>
				<p className="text-caption_s_desk text-medium_grey md:-mt-4 lg:mt-[unset] lg:w-1/2">
					*компания Meta Platforms Inc., владеющая Facebook и Instagram, внесена
					в реестр экстремистских организаций, ее деятельность в России по
					поддержанию указанных соцсетей признана экстремистской деятельностью
				</p>
				<SecondaryButton
					title="Сохранить изменения"
					className="bg-medium_grey border-none text-white w-full md:h-fit md:w-fit "
				/>
			</section>
		</>
	);
});
export default Notifications;
