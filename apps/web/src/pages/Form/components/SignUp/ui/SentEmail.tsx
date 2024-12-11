import { Button } from "@/shared/ui/Button/Button.js";
import sentLetter from "/assets/svg/email-messagesvg.svg";
import { navigate } from "wouter/use-browser-location";
import { useState } from "react";
import { BACKEND_URL } from "@/constants/BackendUrl.js";
import { useAccount } from "@/components/Header/hooks/useAccount.js";

export const SentEmail = () => {
	const [resent, setResent] = useState(false);
	const { profile } = useAccount();

	const handleClick = async () => {
		setResent(true);
		fetch(`${BACKEND_URL}/auth/email/resend/${profile.id}`, { method: "POST" });
	};

	return (
		<div className="flex flex-col gap-5">
			<img src={sentLetter} className="w-20 h-20" />
			<h1 className="text-t1Semi_mob lg:text-t1Semi_deck">Проверь почту</h1>
			<div className="flex flex-col gap-2">
				<h2 className="text-t1Mobile lg:text-t1Regular">
					Мы отправили ссылку для активации аккаунта тебе на email.
				</h2>
				<p className="text-t2Regular lg:text-t2Regular text-medium_grey">
					Если письма нет, не забудь проверить папку «Спам».
				</p>
			</div>
			<Button onClick={handleClick} variant="secondary" disabled={resent}>
				{!resent ? "Отправить email повторно" : "Отправлено"}
			</Button>
			<Button onClick={() => navigate("/")}>Хорошо</Button>
		</div>
	);
};
