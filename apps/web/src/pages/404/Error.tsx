import { Link } from "wouter";

export const ErrorPage = () => {
	return (
		<section className="relative h-screen">
			<div className="w-full h-screen -z-1 absolute flex flex-row justify-between left-0 lg:h-full lg:max-w-7xl lg:px-0 mx-auto px-6 right-0">
				<div className="w-full h-full border-[#f5f5f510]/5 border-x border-dashed" />

				<div className="w-full h-full border-[#f5f5f510]/5 border-x border-dashed" />

				<div className="w-full h-full border-[#f5f5f510]/5 border-x border-dashed" />

				<div className="w-full h-full border-[#f5f5f510]/5 border-x border-dashed" />

				<div className="w-full h-full border-[#f5f5f510]/5 border-x border-dashed" />

				<div className="w-full h-full border-[#f5f5f510]/5 border-x border-dashed" />
			</div>
			<section>
				<svg
					className="absolute blur-3xl right-0 opacity-80"
					width="50%"
					height="100%"
					viewBox="0 0 400 400"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clipPath="url(#clip0_17_60)">
						<g filter="url(#filter0_f_17_60)">
							<path d="M128.6 0H0V322.2L332.5 211.5L128.6 0Z" fill="#4D07E3" />
							<path
								d="M0 322.2V400H240H320L332.5 211.5L0 322.2Z"
								fill="#4C00FF"
							/>
							<path
								d="M320 400H400V78.75L332.5 211.5L320 400Z"
								fill="#7fcef3"
							/>
							<path d="M400 0H128.6L332.5 211.5L400 78.75V0Z" fill="#7fcef3" />
						</g>
					</g>
					<defs>
						<filter
							id="filter0_f_17_60"
							x="-159.933"
							y="-159.933"
							width="719.867"
							height="719.867"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity={0} result="BackgroundImageFix" />
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="BackgroundImageFix"
								result="shape"
							/>
							<feGaussianBlur
								stdDeviation="79.9667"
								result="effect1_foregroundBlur_17_60"
							/>
						</filter>
					</defs>
				</svg>
				<div className="relative items-center w-full px-5 py-24 mx-auto md:px-12 lg:px-16 max-w-7xl lg:pb-32 lg:pt-56">
					<div className="text-left sm:text-center">
						<p className="text-transparent bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500 bg-clip-text">
							404
						</p>
						<p className="mt-12 text-4xl font-normal tracking-tighter text-white sm:text-5xl">
							Oops, page not found
						</p>
						<p className="max-w-2xl mx-auto mt-4 text-gray-300">
							This page does not exist or it was removed.
							<span className="block">We suggest you go back home</span>
						</p>
						<div className="flex flex-col justify-center max-w-xl gap-2 mx-auto mt-12 sm:flex-row">
							<Link
								to="/"
								className="flex items-center justify-center h-10 px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg hover:to-indigo-600 bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-500"
							>
								← &nbsp; Go back home
							</Link>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
};
