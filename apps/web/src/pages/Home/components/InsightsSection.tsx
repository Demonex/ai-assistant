import img from "/assets/imgs/landing-1.png";
import { memo } from "react";

export const InsightsSection = memo(() => {
	return (
		<section className="relative">
			<div className="relative items-center w-full px-5 py-16 mx-auto md:px-12 lg:pb-0 laptop:pt-32 desktop:pt-24 2xl:pt-16">
				<div className="relative flex-col items-start m-auto align-middle">
					<div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
						<div className="relative items-center gap-12 m-auto lg:inline-flex order-first ">
							<div className="max-w-xl desktop:max-w-3xl text-center lg:text-left">
								<div>
									<p className="text-3xl font-medium tracking-tight text-white sm:text-3xl laptop:text-5xl desktop:text-5xl whitespace-nowrap">
										Insights that move you.
									</p>
									<p className="mt-8 text-base laptop:text-[1.125rem] laptop:max-w-[500px] font-normal tracking-tight text-gray-300 px-10 laptop:px-0">
										Receive push notifications for new playlist adds, chart
										positions and feature placements.
									</p>
								</div>
							</div>
						</div>
						<div className="order-first flex flex-col laptop:h-full laptop:flex laptop:justify-center w-full mt-4 laptop:aspect-square lg:mt-0">
							<img
								src={img}
								alt=""
								className="object-contain object-center w-full mx-auto lg:ml-auto px-10 laptop:h-full max-h-[300px] laptop:max-h-[380px] tablet:px-10"
							/>
						</div>
					</div>
				</div>
				<div></div>
			</div>
			<div>
				<svg
					className="absolute blur-3xl opacity-80 right-0 top-0 -mt-20 -z-10"
					width="70%"
					height="70%"
					viewBox="0 0 400 400"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clipPath="url(#clip0_17_60)">
						<g filter="url(#filter0_f_17_60)">
							<path
								d="M128.6 0H0V322.2L332.5 211.5L128.6 0Z"
								fill="#4D07E3"
							></path>
							<path
								d="M0 322.2V400H240H320L332.5 211.5L0 322.2Z"
								fill="#4C00FF"
							></path>
							<path
								d="M320 400H400V78.75L332.5 211.5L320 400Z"
								fill="#B5BFF1"
							></path>
							<path
								d="M400 0H128.6L332.5 211.5L400 78.75V0Z"
								fill="#7fcef3"
							></path>
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
							<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="BackgroundImageFix"
								result="shape"
							></feBlend>
							<feGaussianBlur
								stdDeviation="79.9667"
								result="effect1_foregroundBlur_17_60"
							></feGaussianBlur>
						</filter>
					</defs>
				</svg>
			</div>
		</section>
	);
});
