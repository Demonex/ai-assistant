import { Menu, Transition } from "@headlessui/react";
import { Fragment, memo, useCallback, useEffect, useRef } from "react";
import { useLazyFetch } from "../../../hooks/useFetch.js";
import { navigate } from "wouter/use-browser-location";
import { useHeaderAccountMenu } from "../hooks/useAccountMenu.js";
import { useSizes } from "../../../hooks/useSizes.js";
import { createPortal } from "react-dom";
import { useMobileMenu } from "./MobileMenu/hooks/useMobileMenu.js";
import { BACKEND_URL } from "../../../constants/index.js";
import { useAccount } from "../hooks/useAccount.js";
import { clear } from "use-between";

export const DropdownAccountMenu = memo(() => {
	const { profile, setProfile } = useAccount();
	const { opened, closeMenu } = useHeaderAccountMenu();
	const buttonRef = useRef<HTMLButtonElement>();
	const { setIsOpen } = useMobileMenu();
	const [{ data, error }, fetchSignOut] = useLazyFetch<{
		success: true;
	}>({
		url: `${BACKEND_URL}/auth/sign-out`,
		method: "post",
		cache: false,
	});

	const onAccount = useCallback(() => {
		closeMenu();
		setIsOpen(false);
		navigate("/account");
	}, []);

	const onSignOut = useCallback(async () => {
		await fetchSignOut();
		clear();
		closeMenu();
		setIsOpen(false);
		navigate("/");
	}, []);

	useEffect(() => {
		if (!data) {
			return;
		}
	}, [data, profile]);

	useEffect(() => {
		if (!opened) {
			return;
		}
		buttonRef.current?.click();
	}, [opened]);

	const { isTablet, isMobile } = useSizes();
	return window.document
		? createPortal(
				<Menu
					as="div"
					className={`fixed ${isTablet || isMobile ? "top-24 left-20" : ""} lg:right-4 lg:top-6 z-[60] translate-y-1 translate-x-1`}
				>
					{({ open }) => {
						return (
							<>
								<div>
									<Menu.Button ref={buttonRef} className="hidden"></Menu.Button>
								</div>
								<Transition
									show={open && opened}
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
									afterLeave={closeMenu}
								>
									<Menu.Items className="mt-[50px] w-56 origin-top-right rounded-md  bg-[#15172300]/20 border border-[#ffff]/10 backdrop-blur-2xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="w-full h-full " />
										<div className="px-4 py-3 border-b border-gray-100/5">
											<p className="text-sm text-gray-300">Signed in as</p>
											<p className="truncate text-sm font-medium text-gray-100">
												{profile?.email}
											</p>
										</div>
										<div className="py-1 border-b border-gray-100/5">
											<Menu.Item>
												<span
													onClick={onAccount}
													className="block w-full cursor-pointer px-4 py-2 text-sm hover:text-indigo-500 text-gray-300"
												>
													Account settings
												</span>
											</Menu.Item>
										</div>
										<div className="py-1">
											<Menu.Item>
												<span
													onClick={onSignOut}
													className="block w-full cursor-pointer px-4 py-2 text-sm hover:text-indigo-500 text-gray-300"
												>
													Sign out
												</span>
											</Menu.Item>
										</div>
									</Menu.Items>
								</Transition>
							</>
						);
					}}
				</Menu>,
				window.document.body,
			)
		: null;
});
