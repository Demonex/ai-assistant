import { memo, useEffect, useState } from "react";
import { Link } from "wouter";
import SecondaryButton from "../../../../components/SecondaryButton.js";
import { useSizes } from "../../../../hooks/useSizes.js";

const Cookie = memo(() => {
	const { elementRange } = useSizes();
	const width = elementRange(44, 66);
	const [cookie, setCookie] = useState(
		localStorage.getItem("cookie") === "true",
	);
	const handleClick = () => {
		setCookie(true);
		localStorage.setItem("cookie", "true");
	};

	return (
		!cookie && (
			<div className="w-full px-4 md:px-6 fixed bottom-8 left-1/2 -translate-x-1/2 z-50 lg:pr-[8.4rem] flex justify-end ">
				<div
					style={{
						maxWidth: `${width}rem`,
					}}
					className="w-full bg-gradient-to-r from-[#3272FB] to-[#5A31FF] rounded-[12px] py-4 px-8  flex flex-col md:flex-row gap-4 justify-between items-center "
				>
					<p className="text-caption_r_desk">
						Мы используем файлы cookie из вашего браузера, чтобы улучшить
						отображение и работу ресурса. Оставаясь на сайте, вы соглашаетесь с
						условиями{" "}
						<Link
							to="/documents/privacy-policy"
							className="underline underline-offset-4"
						>
							Политики конфиденциальности
						</Link>
						.
					</p>
					<SecondaryButton
						title="Хорошо"
						className="border-none !text-[#0C0C0C] bg-yellow"
						onClick={handleClick}
					/>
				</div>
			</div>
		)
	);
});
export default Cookie;
