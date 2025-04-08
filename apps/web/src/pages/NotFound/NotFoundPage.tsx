import { memo, useInsertionEffect } from "react";
import { Link } from "react-router";

import { useTheme } from "@repo/web/components/theme-provider.js";

// import { useRouterApp } from "@repo/web/hooks/useRouter.js";

// import { Link } from "wouter";

export const NotFoundPage = memo(() => {
	// const { preloadPage } = useRouterApp();
	const { theme } = useTheme();

	useInsertionEffect(() => {
		const style = document.createElement("style");

		style.innerHTML = `body,html { ${
			theme === "light" ? "background: #fff;" : "background: #000;"
		} overflow: auto; } #app { position: relative; }`;

		document.head.appendChild(style);
		return () => {
			document.head.removeChild(style);
		};
	}, []);

	// useEffect(() => {
	// 	preloadPage("/").catch(console.error);
	// }, []);

	return (
		<div className="flex flex-col pt-4 pb-8 items-center w-full h-full max-w-[40.5rem] mx-auto">
			<Link
				to="/"
				className={`px-4 py-2 text-[15px] font-bold leading-[18px] tracking-[-0.02em] ${
					theme === "light" ? "text-black" : "text-white"
				}`}
			>
				Sigma
			</Link>
			<div
				className="flex-grow flex justify-center items-center relative w-full h-full px-4 sm:px-0"
				style={{
					containerType: "inline-size",
				}}
			>
				<h1
					className={`text-[55.55cqw] font-bold leading-[446.4px] ${
						theme === "light" ? "text-black/20" : "text-white/40"
					} font-mono`}
				>
					404
				</h1>
				<div
					className={`text-[2.77cqw] text-body ${
						theme === "light" ? "text-black" : "text-white"
					} font-normal absolute mt-[15.25%] sm:mt-[16.5%]`}
				>
					Страница, которую вы ищете, не найдена
				</div>
			</div>
			<Link
				to="/"
				className={`py-4 px-8 gap-2 text-white text-body flex items-center ${
					theme === "light" ? "bg-black/90" : "bg-white/10"
				} rounded-2xl whitespace-nowrap`}
			>
				Вернуться обратно →
			</Link>
		</div>
	);
});

export default NotFoundPage;
