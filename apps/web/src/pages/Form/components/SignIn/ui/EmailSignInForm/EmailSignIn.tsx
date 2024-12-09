import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { navigate } from 'wouter/use-browser-location';
import { BACKEND_URL } from '@/constants/BackendUrl.js';
import { useAccount } from '@/components/Header/hooks/useAccount.js';
import { useLazyFetch } from '@/hooks/useFetch.js';
import { EmailLoginInput } from './EmailLoginInput.js';
import { ISignInFormInputs } from '../../types/types.js';
import { PasswordInput } from './PasswordInput.js';
import { RememberMeInput } from './RememberMeInput.js';
import { FormActions } from './FormActions.js';
import { handleRememberMe } from '../../lib/handleRememberMe/handleRememberMe.js';
import { useRememberMe } from '../../hooks/useRememberMe.js';

export const EmailSignIn = () => {
	const { setProfile } = useAccount();

	const {
        register, handleSubmit, formState: {
            errors
        },
        reset,
        setValue,
        setError,
    } = useForm<ISignInFormInputs>();

	const [{data, error}, fetchSignIn] = useLazyFetch({
        url: `${BACKEND_URL}/auth/email/sign-in`,
        method: 'post',
        cache: false
    });

    const onSubmit = useCallback((data: ISignInFormInputs) => {
        const dto = {
            email: data.emailLogin,
            password: data.password,
            rememberMe: data.rememberMe,
        };
        
        fetchSignIn({data: dto})
            .then(() => { handleRememberMe(data) })
            .catch(console.error);
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

    useRememberMe(setValue);

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <EmailLoginInput register={register} error={errors.emailLogin}/>
            <PasswordInput register={register} error={errors.password} />
            <div className="flex md:items-center flex-col md:flex-row gap-4 md:justify-between">
                <RememberMeInput register={register} />
                <div className="text-caption_m_desk">
                    <a href="/auth/password-recovery" className=" hover:text-medium_grey">
                        Восстановить пароль
                    </a>
                </div>
            </div>
            <FormActions reset={reset} />
        </form>
	);
};
