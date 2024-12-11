import {memo, useCallback, useState} from "react";
import sentLetter from "/assets/svg/email-messagesvg.svg";
import capitalize from "lodash.capitalize";
import {useForm} from "react-hook-form";
import {BACKEND_URL} from "../../../../constants/index.js";
import {Link} from "wouter";
import { useMutation } from '@/shared/hooks/useMutation.js';
import { CenteredLoader } from '@/shared/ui/Loader/CenteredLoader.js';

export const PasswordRecovery = memo(() => {
    const [sendRecoveryLink, setSendRecoveryLink] = useState(false);
    const {
        register, handleSubmit, formState: {
            errors
        },
        setError,
        clearErrors,
        setValue,
    } = useForm({criteriaMode: 'all'});

    const [requestPasswordReset, { isLoading }] = useMutation(`${BACKEND_URL}/auth/request-password-reset`, {
        onSuccess: () => setSendRecoveryLink(true),
        onError: () => setError('email', { message: 'Произошла ошибка'}),
    })

    const onSubmit = useCallback(async ({email}) => {
        await requestPasswordReset({email});
    }, [requestPasswordReset])

    if (isLoading) return <CenteredLoader />

    return (

                    <div
                        className="p-0 md:p-10 shadow rounded-2xl  md:bg-popup_gray w-full flex flex-col gap-4 md:gap-5 mb-[7.5rem] lg:mb-[unset]">
                        {
                            sendRecoveryLink
                                ? <div className='flex flex-col gap-5'>
                                    <img src={sentLetter} className='w-20 h-20'/>
                                    <h1 className='text-t1Semi_mob lg:text-t1Semi_deck'>Проверь почту</h1>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='text-t1Mobile lg:text-t1Regular'>Мы отправили ссылку для восстановления пароля тебе на email.</h2>
                                        <p className='text-t2Regular lg:text-t2Regular text-medium_grey'>Если письма нет, не
                                            забудь проверить папку «Спам».</p>
                                    </div>
                                </div>
                                : <>
                                    <h1 className='text-t1Semi_mob lg:text-t1Semi_deck'>Восстановление пароля</h1>
                                    <form className="flex flex-col gap-4"
                                          onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <div>
                                            <label htmlFor="email" className="text-caption_m_desk text-medium_grey">
                                                Email <span className='text-secondary_red'>*</span>
                                            </label>
                                            <div className="mt-1.5">
                                                <input
                                                    type="email"
                                                    autoComplete="email"
                                                    className={`block w-full rounded-xl border border-solid border-dark_grey p-[.875rem] text-white !bg-[transparent] ${errors.email ? '  ring-0 border-secondary_red focus:border-secondary_red focus:ring-0' : 'focus:ring-0 focus:border-medium_grey'} text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey`}
                                                    {...register('email', {required: 'Введите Email '})}
                                                    onChange={({target: {value}}) => {
                                                        setValue('email', value);
                                                        clearErrors('email');
                                                    }}
                                                    placeholder='example@gmail.com'
                                                />
                                                {errors.email &&
                                                    <p className="text-secondary_red text-caption_m_desk mt-1.5">{capitalize(String(errors.email.message))}</p>}
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:flex-row gap-3 md:gap-3.5 mt-2'>
                                            <Link className='w-full' to='/auth/sign-in'>
                                                <button
                                                    className="flex w-full justify-center rounded-xl border border-solid border-medium_grey px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300"
                                                >
                                                    Отмена
                                                </button>
                                            </Link>
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-xl bg-primary_blue px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300"
                                            >
                                                Сбросить пароль
                                            </button>
                                        </div>
                                    </form>
                                </>
                        }
                    </div>
    )
})
