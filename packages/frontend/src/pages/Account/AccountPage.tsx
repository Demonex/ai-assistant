import {useLazyFetch} from '../../hooks/useFetch.js';
import {BACKEND_URL} from '../../constants/index.js';
import SecondaryButton from '../../components/SecondaryButton.js';
import {SignOutIcon} from '../../assets/SignOutIcon.js';
import {clear} from "use-between";
import PopupDeleteAccount from "./components/Account/PopupDeleteAccount.js";
import { useRedirectIfNoProfile } from '@/shared/hooks/useRedirectIfNoProfile.js';
import { navigate } from 'wouter/use-browser-location';
import { AccountBody } from './components/Account/AccountBody.js';

export const AccountPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{data: signOut}, fetchSignOut] = useLazyFetch({
    url: `${BACKEND_URL}/auth/sign-out`,
    method: 'post',
  });

  const onSubmitSignOut = async () => {
    await fetchSignOut();
    clear();
    navigate('/auth/sign-in');
  }

  useRedirectIfNoProfile();

  return (
      <div className="w-full h-full px-6 overflow-auto">
        <PopupDeleteAccount/>
        <div className="w-full py-4  flex justify-between ">
          <h1 className="text-t1Semi_deck font-extrabold tracking-tight text-slate-200">Аккаунт</h1>
          <SecondaryButton title="Выйти" className="flex flex-row-reverse gap-2" onClick={onSubmitSignOut}>
            <SignOutIcon className="fill-light_grey"/>
          </SecondaryButton>
        </div>
        <AccountBody />
      </div>
  );
};
