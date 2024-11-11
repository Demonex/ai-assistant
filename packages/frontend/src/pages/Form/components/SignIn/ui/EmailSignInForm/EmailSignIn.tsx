import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { navigate } from 'wouter/use-browser-location';

import { BACKEND_URL } from '@/constants/BackendUrl.js';
import { useAccount } from '@/components/Header/hooks/useAccount.js';
import { useLazyFetch } from '@/hooks/useFetch.js';
import { EmailLoginInput } from './EmailLoginInput.js';
import { ISignInFormInputs } from '../../types/types.js';
import { PasswordInput } from './PasswordInput.js';

export const EmailSignIn = () => {
	const { setProfile } = useAccount();

	const {
        register, handleSubmit, formState: {
            errors
        },
        setError,
    } = useForm<ISignInFormInputs>();

	const [{data, error}, fetchSignIn] = useLazyFetch({
        url: `${BACKEND_URL}/auth/email/sign-in`,
        method: 'post',
        cache: false
    });

    const onSubmit = useCallback(data => {
        fetchSignIn({data}).catch(console.error);
    }, [fetchSignIn]);

	useEffect(() => {
        if (error?.response?.status !== 401) {
            return;
        }

        error?.response.data.messages.forEach((item, index) => {

            setError(`emailLogin`, {
                message: 'Учётная запись не найдена'
            }, {
                shouldFocus: index === 0
            });
        });

    }, [error, setError]);

    useEffect(() => {
        if (!data) {
            return;
        }
        setProfile(data);
        navigate('/account');
    }, [data, setProfile]);

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <EmailLoginInput register={register} error={errors.emailLogin}/>
            <PasswordInput register={register} error={errors.password} />
            <div className="flex md:items-center flex-col md:flex-row gap-4 md:justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        defaultChecked={true}
                        className="h-6 w-6 rounded border-dark_grey bg-popup_gray "
                    />
                    <label htmlFor="remember-me"
                           className="ml-2 text-caption_r_desk text-medium_grey">
                        Запомнить меня
                    </label>
                </div>
                <div className="text-caption_m_desk">
                    <a href="/auth/password-recovery" className=" hover:text-medium_grey">
                        Восстановить пароль
                    </a>
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-3 md:gap-3.5 mt-2'>
                <button
                    type="button"
                    className="flex w-full justify-center rounded-xl border border-solid border-medium_grey px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300"
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-xl bg-primary_blue px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300"
                >
                    Войти
                </button>
            </div>
        </form>
	);
};
