import type React from "react";
import {
	type ChangeEvent,
	type FC,
	forwardRef,
	type ReactNode,
	useRef,
} from "react";
import modifyIcon from "/assets/svg/modify_icon.svg";
import avatarStub from "/assets/svg/avatar_unauthorized.svg";
import { UploadIcon } from "../assets/UploadIcon.js";

interface SharedFileInputProps {
	currentImage: string | null;
	onImageChange?: (image: string | null) => void;
	onUploadImage?: () => void;
	onRemoveImage?: () => void;
	labelText?: string;
	labelClass?: string;

	className?: string;
	iconClass?: string;

	isInverted?: boolean;

	withOverlay?: boolean;
	withAdaptive?: boolean;

	myActions?: ReactNode;
	accept?: string;
	uploadButton?: "submit" | "default";

	iconIsPlus?: boolean;
	ref?: React.ForwardedRef<HTMLInputElement>;
}

// !FIX сделать обертку div. т.к в label нельзя вставлять buttin. и при нажатии на actions (когда картинка залита и поверх нее кнопки) то это тоже эвент клика на label и залитие картинки
export const SharedFileInput: FC<SharedFileInputProps> = forwardRef(
	(
		{
			currentImage,
			onImageChange,
			onUploadImage,
			onRemoveImage,
			labelText = "Загрузите изображение",
			isInverted = false,
			withOverlay = false,
			withAdaptive = false,
			iconIsPlus = false,
			className = "",
			labelClass = "",
			iconClass = "",
			accept = "image/*",
			myActions,
			uploadButton = "default",
			...props
		},
		forwardedRef: React.ForwardedRef<HTMLInputElement>,
	) => {
		const { onChange } = props as any;

		const refInput = useRef<HTMLInputElement>(null);
		const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
			if (onImageChange) {
				const file = event.target.files?.[0];
				if (file) {
					const reader = new FileReader();
					reader.onloadend = () => {
						onImageChange(reader.result as string);
					};
					reader.readAsDataURL(file);
				}
			}
		};

		const handleUploadImage = () => {
			refInput.current?.click();
		};

		const handleRemoveImage = () => {
			if (onRemoveImage) {
				onRemoveImage();
			}
		};

		// @ts-ignore
		return (
			<>
				<label key={currentImage} className="">
					{/* Input for selecting a new image */}
					<input
						className="hidden"
						type="file"
						accept={accept}
						{...props}
						onChange={(e) => {
							handleImageChange(e);
							if (typeof onChange === "function") {
								onChange(e);
							}
						}}
						ref={(_ref) => {
							if (typeof forwardedRef === "function") {
								forwardedRef(_ref);
							}
							refInput.current = _ref;
						}}
					/>
					<div>
						{!currentImage ? (
							<div className="relative ">
								<img
									src={avatarStub}
									alt="avatar"
									className="w-[7.5rem] min-h-[7.5rem] rounded-[2rem]"
								/>
								<div className="w-full min-h-full flex flex-col gap-2 items-center absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-center opacity-0 hover:opacity-100 transition duration-300 cursor-pointer">
									<UploadIcon className="fill-white" />
									<p className="text-caption_s_desk">Сменить</p>
								</div>
							</div>
						) : (
							<div className="relative ">
								<img
									src={currentImage || modifyIcon}
									alt=""
									className="w-[7.5rem] min-h-[7.5rem] rounded-[2rem]"
								/>
								<div className="w-full min-h-full flex flex-col gap-2 items-center absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-center opacity-0 hover:opacity-100 transition duration-300 cursor-pointer">
									<UploadIcon className="fill-white" />
									<p className="text-caption_s_desk">Сменить</p>
								</div>
							</div>
						)}
					</div>
				</label>
			</>
		);
	},
);
