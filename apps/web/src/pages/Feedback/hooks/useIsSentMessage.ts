import { type Dispatch, type SetStateAction, useState } from "react";
import useSharedHook from "../../../hooks/useSharedHook.js";

const _useIsSentMessage = (): {
	isSentMessage: boolean;
	setIsSentMessage: Dispatch<SetStateAction<boolean>>;
} => {
	const [isSentMessage, setIsSentMessage] = useState(false);

	return {
		isSentMessage,
		setIsSentMessage,
	};
};

export const useIsSentMessage = () =>
	useSharedHook<ReturnType<typeof _useIsSentMessage>>(_useIsSentMessage);
