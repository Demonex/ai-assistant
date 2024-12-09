import SecondaryCloseIcon from '@/assets/SecondaryCloseIcon.js';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode
}

export const Modal = (props: ModalProps) => {
	const { open, onClose, children } = props;

	return (
		<Transition
			show={open}
			as={Fragment}
		>
			<Dialog
				onClose={onClose}
				className="relative z-50"
			>
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
			<div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true"/>
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
			<div
				className="fixed md:top-[8.75rem] left-1/2 -translate-x-1/2  inset-0 flex  items-center justify-center w-full h-full md:max-w-[35rem] md:h-fit "
			>
				<Dialog.Panel
						className="w-full md:max-w-[35rem] bg-popup_gray h-full md:h-fit md:rounded-xl flex flex-col items-start justify-start md:justify-center p-4 md:p-10"
				>
					<button className='w-full flex justify-end pb-4' onClick={onClose}>
						<SecondaryCloseIcon className="stroke-white w-7 h-7"/>
					</button>
					{children}
				</Dialog.Panel>
				</div>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
};
