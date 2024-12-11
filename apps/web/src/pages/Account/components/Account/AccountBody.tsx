import { useAccount } from "@/components/Header/hooks/useAccount.js";
import { AccountTabs } from "./AccountTabs.js";
import { EmailConfirmRequired } from "./EmailConfirmRequired.js";

export const AccountBody = () => {
	const { profile } = useAccount();

	return (
		<>{profile?.emailVerified ? <AccountTabs /> : <EmailConfirmRequired />}</>
	);
};
