import { useAccountSettings } from "../hooks/useAccountSettings.js";
import { useCallback, useState } from "react";
import { useLazyFetch } from "../../../../hooks/useFetch.js";
import { BACKEND_URL } from "../../../../constants/index.js";
import { clear } from "use-between";
import SecondaryButton from "../../../../components/SecondaryButton.js";
import { Modal } from "@/shared/ui/Modal/index.js";
import { ModalTitle } from "@/shared/ui/Modal/ui/ModalTitle.js";
import { ModalComment } from "@/shared/ui/Modal/ui/ModalComment.js";
import { ModalActions } from "@/shared/ui/Modal/ui/ModalActions.js";
import { navigate } from "wouter/use-browser-location";

const PopupDeleteAccount = () => {
	const { openPopupDeleteAccount, setOpenPopupDeleteAccount } =
		useAccountSettings();
	const [accountDeleted, setAccountDeleted] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [{ data: deleteProfile }, fetchDelete] = useLazyFetch({
		url: `${BACKEND_URL}/profile/delete`,
		method: "delete",
		cache: false,
	});

	const onSubmitDelete = () => {
		navigate("/auth/sign-up");
	};

	const confirmDeleting = () => {
		setAccountDeleted(true);
		fetchDelete();
	};

	const handleClose = useCallback(() => {
		if (accountDeleted) {
			clear();
		}

		setOpenPopupDeleteAccount(false);
	}, [accountDeleted, setOpenPopupDeleteAccount]);

	return (
		<Modal open={openPopupDeleteAccount} onClose={handleClose}>
			{accountDeleted ? (
				<>
					<ModalTitle>Аккаунт отправлен на удаление.</ModalTitle>
					<ModalComment>
						Если передумаешь, напиши в техподдержку в течение 30 дней.
					</ModalComment>
					<ModalActions>
						<SecondaryButton
							title="Закрыть"
							onClick={onSubmitDelete}
							className="w-full bg-primary_blue border-none text-white"
						/>
					</ModalActions>
				</>
			) : (
				<>
					<ModalTitle>Ты действительно хочешь удалить аккаунт?</ModalTitle>
					<ModalComment>
						Все подписки, привязанные к аккаунту, будут аннулированы.
					</ModalComment>
					<ModalActions>
						<SecondaryButton
							title="Отмена"
							onClick={() => setOpenPopupDeleteAccount(false)}
							className="w-full"
						/>
						<SecondaryButton
							title="Удалить"
							type="button"
							onClick={confirmDeleting}
							className="w-full bg-secondary_red text-white border-none"
						/>
					</ModalActions>
				</>
			)}
		</Modal>
	);
};

export default PopupDeleteAccount;
