import { useState } from 'react';
import { FormContainer } from '../../../../../shared/ui/FormUi/FormContainer.js';
import { SelectSignInMethod } from './SelectSignInMethod.js';
import type { SignInMethod } from '../types/types.js';
import { EmailSignIn } from './EmailSignInForm/EmailSignIn.js';
import { ServicesSignIn } from './ServicesSignIn.js';
import { NoAccount } from './NoAccount.js';
import { useRedirectIfProfile } from '@/shared/hooks/useRedirectIfProfile.js';

export const SignInPage = () => {
    const [signInOption, setSignInOption] = useState<SignInMethod>('email');

    useRedirectIfProfile();

    return (
            <FormContainer>
                <h1 className='text-t1Semi_mob lg:text-t1Semi_deck'>Вход в аккаунт</h1>
                <SelectSignInMethod signInOption={signInOption} setSignInOption={setSignInOption}/>
                {
                    signInOption === 'email'
                        ? <EmailSignIn />
                        : <div className='py-4 w-full flex flex-col gap-9 '>
                            <ServicesSignIn />
                            <button
                                className="flex w-full justify-center rounded-xl border border-solid border-medium_grey px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300"
                            >
                                Отмена
                            </button>
                        </div>
                }
                <NoAccount />
            </FormContainer>
    );
};
