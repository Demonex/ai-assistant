import videoWebm from "/assets/video/video.webm";
import appstore from "/assets/imgs/app-store-badge.svg";
import imgWebp from "/assets/imgs/safarimobile.webp";
import googleplay from "/assets/imgs/google-play-badge.svg";
import { memo } from "react";
import { ShowOnMobileToTablet } from "../../../components/Sizes/ShowOnMobileToTablet/ShowOnMobileToTablet.js";
import { ShowOnLaptopToDesktop } from "../../../components/Sizes/ShowOnLaptopToDesktop/ShowOnLaptopToDesktop.js";

export const HeroSection = memo(() => {
	return (
		<section>
			<div className="relative items-center w-full px-5 pt-24 pb-10 mx-auto md:px-12 lg:px-16 laptop:pt-32 desktop:pt-24 2xl:pt-16">
				<div className="relative flex-col items-start m-auto align-middle">
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
						<div className="relative items-center gap-12 m-auto lg:inline-flex order-first ">
							<div className="max-w-xl desktop:max-w-3xl text-center lg:text-left">
								<div>
									<p className="mt-8 text-3xl font-medium tracking-tight text-white sm:text-4xl laptop:text-5xl desktop:text-6xl">
										Real-time music data analytics for artists and labels.
									</p>
								</div>
								<div className="flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row lg:justify-start">
									<button
										type="button"
										className="flex items-center justify-center h-10 px-4 py-2 text-sm font-semibold transition-all bg-white rounded-lg text-vulcan-900 hover:text-indigo-500"
									>
										GET STARTED FOR FREE
									</button>
								</div>
							</div>
						</div>
						<div className="order-first flex flex-col laptop:h-full laptop:flex laptop:justify-center w-full mt-6 md:mt-12 laptop:aspect-square lg:mt-0">
							<ShowOnMobileToTablet>
								<div className="w-full h-full flex items-center justify-center">
									<img src={imgWebp} alt="" className="w-[50%] h-full" />
								</div>
								<div className="self-center flex gap-5 mt-8">
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://apps.apple.com/app/songstats/id1436000800"
									>
										<img
											alt="Get Songstats on the App Store"
											src={appstore}
											className="h-[30px] laptop:h-[40px]"
										/>
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://play.google.com/store/apps/details?id=com.trackstats"
									>
										<img
											alt="Get Songstats on the Google Play Store"
											src={googleplay}
											className="h-[30px] laptop:h-[40px]"
										/>
									</a>
								</div>
							</ShowOnMobileToTablet>
							<ShowOnLaptopToDesktop>
								<video
									autoPlay={true}
									muted={true}
									className="object-cover object-center w-full mx-auto lg:ml-auto laptop:h-full laptop:max-h-[600px]"
									src={videoWebm}
								></video>
								<div className="self-center flex gap-5">
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://apps.apple.com/app/songstats/id1436000800"
									>
										<img
											alt="Get Songstats on the App Store"
											src={appstore}
											className="h-[30px] laptop:h-[40px]"
										/>
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://play.google.com/store/apps/details?id=com.trackstats"
									>
										<img
											alt="Get Songstats on the Google Play Store"
											src={googleplay}
											className="h-[30px] laptop:h-[40px]"
										/>
									</a>
								</div>
							</ShowOnLaptopToDesktop>
						</div>
					</div>
				</div>
				<div></div>
			</div>
		</section>
	);
});
