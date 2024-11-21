import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLazyFetch } from '../../../../../hooks/useFetch.js';
import { BACKEND_URL } from '../../../../../constants/index.js';
import { useAccount } from '../../../../../components/Header/hooks/useAccount.js';
import { EmailInput } from './EmailInput.js';
import { PasswordIput } from './PasswordInput.js';
import { RepeatPasswordInput } from './RepeatPasswordInput.js';
import { AcceptPolicyInput } from './AcceptPolicyInput.js';
import { LoginInput } from './LoginIput.js';
import { ISignUpFormInputs } from '../types/types.js';
import { SentEmail } from './SentEmail.js';
import { FormActions } from './FormActions.js';
import { AlreadyRegistered } from './AlreadyRegistered.js';
import { FormContainer } from '../../../../../shared/ui/FormUi/FormContainer.js';
import { useRedirectIfProfile } from '@/shared/hooks/useRedirectIfProfile.js';
 
export const SignUpPage = () => {
    const { setProfile } = useAccount();
    
    const passwordRef = useRef('');
    const [sendRegisterLink, setSendRegisterLink] = useState(false);

    const {
        register, handleSubmit, formState: {
            errors
        },
        setError,
        reset,
    } = useForm<ISignUpFormInputs>({criteriaMode: 'all'});

    const [{data, error: requestError}, fetchSignUp] = useLazyFetch({
        url: `${BACKEND_URL}/auth/email/sign-up`,
        method: 'post',
        cache: false
    });

    const onSubmit = useCallback((data) => {
        const { name, email, password, policyAccepted } = data;

        const dto = {
            name,
            email,
            password,
            consent: policyAccepted
        }

        fetchSignUp({data: dto}).catch(console.error);
        setSendRegisterLink(true)
    }, [fetchSignUp]);

    useEffect(() => {
        if (requestError?.response?.status !== 400) {
            return;
        }

        requestError?.response.data.messages.forEach((item, index) => {
            setError(`${item.property}` as "name" | "email" | "password" | "repeatPassword" | "policyAccepted", {
                message: item.messages.join(' ')
            }, {
                shouldFocus: index === 0
            });
        });

    }, [requestError, setError]);

    useEffect(() => {
        if (!data) {
            return;
        }
        setProfile(data);
    }, [data, setProfile]);

    useRedirectIfProfile();

    if (sendRegisterLink) return <FormContainer><SentEmail /></FormContainer>;

    return (
        <FormContainer>
            <h1 className='text-t1Semi_mob lg:text-t1Semi_deck'>Создание аккаунта</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <LoginInput 
                    register={register}
                    error={errors.name}
                />
                <EmailInput 
                    register={register} 
                    error={errors.email} 
                />
                <PasswordIput
                    register={register}
                    error={errors.password}
                    passwordRef={passwordRef}
                />
                <RepeatPasswordInput
                    register={register}
                    error={errors.repeatPassword}
                    passwordRef={passwordRef}
                />
                <AcceptPolicyInput
                    register={register}
                    error={errors.policyAccepted}
                />
                <FormActions reset={reset} />
            </form>
            <AlreadyRegistered />
        </FormContainer>
    );
};
