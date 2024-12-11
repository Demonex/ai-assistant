import { navbar } from "../../data/consts/navbar.js";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { memo } from "react";
import { Menu } from "./components/Menu.js";
import { ShowOnLaptopToDesktop } from "../Sizes/ShowOnLaptopToDesktop/ShowOnLaptopToDesktop.js";
import { ShowOnMobileToTablet } from "../Sizes/ShowOnMobileToTablet/ShowOnMobileToTablet.js";
import { Link } from "wouter";
import { DropdownAccountMenu } from "./components/DropdownAccountMenu.js";
import { useHeaderAccountMenu } from "./hooks/useAccountMenu.js";
import { MobileMenu } from "./components/MobileMenu/index.js";
import { useMobileMenu } from "./components/MobileMenu/hooks/useMobileMenu.js";
import { useAccount } from "./hooks/useAccount.js";

export const Unauthorised = memo(() => {
	const { setIsOpen } = useMobileMenu();
	return (
		<div className=" gap-2 items-center flex mx-2 justify-start">
			<Link
				onClick={() => setIsOpen(false)}
				className="text-sm text-white font-normal leading-6 py-1.5 px-4 cursor-pointer border border-gray-300/20 rounded-[8px] hover:bg-gray-600/20 whitespace-nowrap"
				to="/auth/sign-in"
			>
				Sign In
			</Link>
			<Link
				onClick={() => setIsOpen(false)}
				to="/auth/sign-up"
				className="text-sm text-black font-normal leading-6 py-1.5 px-4 bg-gray-100 rounded-[8px] cursor-pointer ring-1 ring-inset ring-white/20 hover:bg-gray-300 whitespace-nowrap"
			>
				Sign Up
			</Link>
		</div>
	);
});
export const Authorised = memo(() => {
	const { toggleMenu } = useHeaderAccountMenu();
	return (
		<div className="relative">
			<div className="flex items-center lg:border-l sm:pl-0 lg:ml-6 lg:pl-6 sm:border-0 border-slate-800/50">
				<Link to="/account" type="button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							className="stroke-slate-500"
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
						/>
					</svg>
				</Link>
				<div className="relative z-10">
					<div
						onClick={toggleMenu}
						className="ml-6 text-slate-400 hover:text-slate-300"
					>
						<img
							className="inline-block h-6 w-6 rounded-full cursor-pointer"
							src="https://images.unsplash.com/photo-1526137847469-9ffd50fa0fa0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=ian-e-3GuaLSVJFmo-unsplash.jpg&w=640"
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>
	);
});

export const Header = memo(() => {
	const { profile } = useAccount();
	const { setIsOpen } = useMobileMenu();
	return (
		<>
			<DropdownAccountMenu />
			<div className="w-screen fixed z-20">
				<header className=" bg-[#15172300]/20 backdrop-blur-2xl border-b border-[#ffff]/10 relative h-[75px] w-full">
					<nav
						className="h-full mx-auto flex  items-center justify-between p-3 lg:px-8 gap-4"
						aria-label="Global"
					>
						<div className="flex flex-row gap-6 w-full justify-between items-center">
							<Link
								to="/"
								className="flex flex-row items-center cursor-pointer gap-x-0.5"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									x="0px"
									y="0px"
									className="w-[30px] h-[30px]"
								>
									<g>
										<path
											fill="#fff"
											d="M15.80762,3.106a.49281.49281,0,0,0-.42871-.09082l-8,2A.4998.4998,0,0,0,7,5.5v8.01257A2.4757,2.4757,0,0,0,5.5,13,2.5,2.5,0,1,0,8,15.5V8.89014l7-1.75v4.37243A2.4757,2.4757,0,0,0,13.5,11,2.5,2.5,0,1,0,16,13.5V3.5A.50094.50094,0,0,0,15.80762,3.106Z"
										/>
									</g>
								</svg>
								<h2 className="text-white font-bold text-[20px]">Rifify</h2>
							</Link>
							<div className="flex px-5 flex-1 laptop:justify-start justify-end">
								<ShowOnLaptopToDesktop>
									<div className="flex gap-x-3 desktop:gap-x-10 relative">
										{navbar.map((item, index) => (
											<Menu
												key={index}
												title={item.title}
												items={item.content}
											/>
										))}
									</div>
								</ShowOnLaptopToDesktop>
								<ShowOnMobileToTablet>
									<div className="flex">
										<button
											type="button"
											className="-m-2.5 inline-flex items-center justify-center rounded-md p-3 text-white noSelect"
											onClick={() => setIsOpen(true)}
										>
											<span className="sr-only">Open main menu</span>
											<Bars3Icon className="h-6 w-6 " aria-hidden="true" />
										</button>
									</div>
								</ShowOnMobileToTablet>
							</div>
							<ShowOnLaptopToDesktop>
								{/*<Search/>*/}
								{profile !== undefined ? <Authorised /> : <Unauthorised />}
							</ShowOnLaptopToDesktop>
						</div>
					</nav>
					<MobileMenu />
				</header>
			</div>
		</>
	);
});
