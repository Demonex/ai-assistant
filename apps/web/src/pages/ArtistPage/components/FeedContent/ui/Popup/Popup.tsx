import { Dialog, Transition } from "@headlessui/react";
import type React from "react";
import { Fragment, memo } from "react";
import "../../../../../../index.css";

type PopupProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<PopupProps["isOpen"]>>;
};

export const Popup = memo<PopupProps>(({ isOpen, setIsOpen }) => (
	<Transition show={isOpen} as={Fragment}>
		<Dialog onClose={() => setIsOpen(false)} className="relative z-50">
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm"
					aria-hidden="true"
				/>
			</Transition.Child>

			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex w-[80%] md:max-w-md  items-center justify-center bg-gradient-to-b from-indigo-500/40 via-indigo-500/30 rounded-xl p-[0.060rem] text-center bg-gray-900 max-h-[15rem]">
					<Dialog.Panel className="w-full bg-gray-900 px-6 h-full rounded-xl flex flex-col items-start justify-center">
						<Dialog.Title className="font-bold text-white mb-4 text-xl">
							You've Found A Premium Feature!&nbsp; 😎
						</Dialog.Title>
						<Dialog.Description className="text-sm text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text font-light">
							Subscribe in order to filter by source type.
						</Dialog.Description>
						<div className="w-full flex py-3 justify-end gap-4 mt-8">
							<button
								onClick={() => setIsOpen(false)}
								className="px-4 py-2 text-white rounded-[8px] border border-indigo-500 text-xs"
							>
								Cancel
							</button>
							<button
								onClick={() => setIsOpen(false)}
								className="px-4 py-2 text-white rounded-[8px] bg-indigo-400 text-xs"
							>
								Subscribe
							</button>
						</div>
					</Dialog.Panel>
				</div>
			</Transition.Child>
		</Dialog>
	</Transition>
));
