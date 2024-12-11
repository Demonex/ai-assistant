import img from "/assets/imgs/landing-3.png";
import { memo } from "react";

export const MeasureSuccess = memo(() => {
	return (
		<section className="relative">
			<div className="relative items-center w-full px-5 py-12 pb-24 mx-auto md:px-12 lg:px-16 laptop:pt-0">
				<div className="relative flex-col items-start m-auto align-middle">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-24">
						<div className="relative items-center gap-12 m-auto lg:inline-flex order-first ">
							<div className="max-w-xl desktop:max-w-3xl text-center lg:text-left">
								<div>
									<p className="text-3xl font-medium tracking-tight text-white sm:text-3xl laptop:text-5xl desktop:text-5xl whitespace-nowrap">
										Measure your success.
									</p>
									<p className="mt-8 text-base laptop:text-[1.125rem] laptop:max-w-[500px] font-normal tracking-tight text-gray-300 px-10 laptop:px-0">
										Stay on top of the DSPs and monitor your streams, playlist
										reach and engagement.
									</p>
								</div>
							</div>
						</div>
						<div className="order-first flex flex-col laptop:h-full laptop:flex laptop:justify-center w-full mt-12 laptop:aspect-square lg:mt-0">
							<img
								src={img}
								alt=""
								className="object-contain object-center w-full mx-auto lg:ml-auto px-8 laptop:h-full max-h-[300px] laptop:max-h-[380px] "
							/>
						</div>
					</div>
				</div>
				<div></div>
			</div>
		</section>
	);
});
