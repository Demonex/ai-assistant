import {navigate} from 'wouter/use-browser-location';
import {memo, useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useLazyFetch} from '../../../../hooks/useFetch.js';
import {ErrorPage} from '../../../404/Error.js';
import capitalize from 'lodash.capitalize';
import get from 'lodash.get';
import {BACKEND_URL} from '../../../../constants/index.js';
import {useAccount} from '../../../../components/Header/hooks/useAccount.js';
import {useElementRangeSize} from "../../../../hooks/useElementRangeSize.js";
import LogoNew from "../../../../assets/LogoNew.js";
import {useSizes} from "../../../../hooks/useSizes.js";
import RRR from "/assets/svg/RRRRR.svg";
import shownPassword from "/assets/svg/shown_password.svg";
import hiddenPassword from "/assets/svg/hidden_password.svg";
import sentLetter from "/assets/svg/email-messagesvg.svg";


export const SignUpPage = memo(() => {
    const {
        setProfile,
        profile
    } = useAccount();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [sendRegisterLink, setSendRegisterLink] = useState(false);
    const [comparePassword, setComparePassword] = useState('');

    const {
        register, handleSubmit, formState: {
            errors
        },
        setError,
        clearErrors,
        setValue,
        reset
    } = useForm({criteriaMode: 'all'});
    const [{data, error}, fetchSignUp] = useLazyFetch({
        url: `${BACKEND_URL}/auth/email/sign-up`,
        method: 'post',
        cache: false
    });

    const onSubmit = useCallback(data => {
        console.log('data', data)
        fetchSignUp({data}).catch(console.error);
        // setSendRegisterLink(true)
    }, []);

    useEffect(() => {
        if (get(error, 'response.status') !== 400) {
            return;
        }
        error?.response.data.messages.forEach((item, index) => {
            setError(`${item.property}`, {
                message: item.messages.join(' ')
            }, {
                shouldFocus: index === 0
            });
        });

    }, [error]);

    useEffect(() => {
        if (!data) {
            return;
        }
        setProfile(data);
        navigate('/account');
    }, [data]);

    return profile ? (
        <ErrorPage/>
    ) : (
                    <div
                        className="p-0 md:p-10 shadow rounded-2xl  md:bg-popup_gray w-full flex flex-col gap-4 md:gap-5 mb-[7.5rem] lg:mb-[unset]">
                        {
                            sendRegisterLink
                                ? <div className='flex flex-col gap-5'>
                                    <img src={sentLetter} className='w-20 h-20'/>
                                    <h1 className='text-t1Semi_mob lg:text-t1Semi_deck'>Проверь почту</h1>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='text-t1Mobile lg:text-t1Regular'>Мы отправили ссылку для активации
                                            аккаунта тебе на email.</h2>
                                        <p className='text-t2Regular lg:text-t2Regular text-medium_grey'>Если письма нет, не
                                            забудь проверить папку «Спам».</p>
                                    </div>
                                </div>
                                : <>
                                    <h1 className='text-t1Semi_mob lg:text-t1Semi_deck'>Создание аккаунта</h1>
                                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                                        <div>
                                            <label htmlFor="firstName"
                                                   className="text-caption_m_desk text-medium_grey">
                                                Логин <span className='text-secondary_red'>*</span>
                                            </label>
                                            <div className="mt-1.5">
                                                <input
                                                    type="text"
                                                    autoComplete="firstName"
                                                    className="block w-full border-solid rounded-xl border border-dark_grey p-[.875rem] text-white !bg-[transparent] text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey focus:ring-0 focus:border-medium_grey"
                                                    {...register('firstName')}
                                                    onChange={({target: {value}}) => {
                                                        setValue('firstName', value);
                                                    }}
                                                    placeholder='Придумай логин'
                                                />
                                            </div>
                                        </div>
                                        {/*<div>
                                <label htmlFor="lastName"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Фамилия
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        autoComplete="lastName"
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        {...register('lastName')}
                                        onChange={({target: {value}}) => {
                                            setValue('lastName', value);
                                        }}
                                    />
                                </div>
                            </div>*/}
                                        <div>
                                            <label htmlFor="email" className="text-caption_m_desk text-medium_grey">
                                                Email <span className='text-secondary_red'>*</span>
                                            </label>
                                            <div className="mt-1.5">
                                                <input
                                                    type="email"
                                                    autoComplete="email"
                                                    className={`block w-full border-solid  rounded-xl border border-dark_grey p-[.875rem] text-white !bg-[transparent] ${errors.email ? '  ring-0 border-secondary_red focus:border-secondary_red focus:ring-0' : 'focus:ring-0 focus:border-medium_grey'} text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey`}
                                                    {...register('email', {required: 'Email необходим'})}
                                                    onChange={({target: {value}}) => {
                                                        setValue('email', value);
                                                        clearErrors('email');
                                                    }}
                                                    placeholder='Введи email или логин'
                                                />
                                                {errors.email &&
                                                    <p className="text-secondary_red text-caption_m_desk mt-1.5">{capitalize(String(errors.email.message))}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="password"
                                                   className="text-caption_m_desk text-medium_grey">
                                                Пароль <span className='text-secondary_red'>*</span>
                                            </label>
                                            <div className="mt-1.5">
                                                <div
                                                    className={`flex w-full rounded-xl border border-dark_grey p-[.875rem]  focus:ring-0 focus:border-medium_grey`}>
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        autoComplete="current-password"
                                                        className=' !bg-[transparent] border-none p-0 text-white text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey focus:ring-0 w-full'
                                                        onChange={({target: {value}}) => {
                                                            setComparePassword(value);
                                                            clearErrors('password');
                                                        }}
                                                    />
                                                    {
                                                        showPassword
                                                            ? <button onClick={() => setShowPassword(!showPassword)} type='button'>
                                                                <img src={shownPassword}/>
                                                            </button>
                                                            : <button onClick={() => setShowPassword(!showPassword)} type='button'>
                                                                <img src={hiddenPassword}/>
                                                            </button>
                                                    }
                                                </div>
                                                {/*{errors.password &&
                                                    <p className="text-secondary_red text-caption_m_desk mt-1.5">{capitalize(String(errors.password.message))}</p>}*/}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="password"
                                                   className="text-caption_m_desk text-medium_grey">
                                                Пароль ещё раз <span className='text-secondary_red'>*</span>
                                            </label>
                                            <div className="mt-1.5">
                                                <div
                                                    className={`flex w-full rounded-xl border border-dark_grey p-[.875rem]  ${errors.password ? '  ring-0 border-secondary_red focus:border-secondary_red ' : 'focus:ring-0 focus:border-medium_grey'} `}>
                                                    <input
                                                        type={showPasswordRepeat ? 'text' : 'password'}
                                                        autoComplete="current-password"
                                                        className=' !bg-[transparent] border-none p-0 text-white text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey focus:ring-0 w-full'
                                                        {...register('password', {
                                                            required: 'Пароль обязателен',
                                                            minLength: 6,
                                                            validate: value => value === comparePassword || 'Пароли не совпадают',
                                                            /*pattern: {
                                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                                message: 'Пароль должен содержать не менее 8 символов, по крайней мере одну заглавную и одну прописную буквы, одну цифру и спецсимвол '
                                                            }*/
                                                        })}
                                                        onChange={({target: {value}}) => {
                                                            setValue('password', value);
                                                            clearErrors('password');
                                                        }}
                                                    />
                                                    {
                                                        showPasswordRepeat
                                                            ? <button
                                                                onClick={() => setShowPasswordRepeat(!showPasswordRepeat)} type='button'>
                                                                <img src={shownPassword}/>
                                                            </button>
                                                            : <button
                                                                onClick={() => setShowPasswordRepeat(!showPasswordRepeat)} type='button'>
                                                                <img src={hiddenPassword}/>
                                                            </button>
                                                    }
                                                </div>
                                                {
                                                    errors.password &&
                                                    <p className="text-secondary_red text-caption_m_desk mt-1.5">{capitalize(String(errors.password.message))}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <input
                                                    id="remember-me"
                                                    name="remember-me"
                                                    type="checkbox"
                                                    defaultChecked={false}
                                                    className="h-6 w-6 rounded border-solid border-dark_grey bg-popup_gray "
                                                />
                                                <label htmlFor="remember-me"
                                                       className="ml-2 text-caption_r_desk text-medium_grey">
                                                    Согласен с условиями <a className='text-[white] cursor-pointer'>Пользовательского
                                                    соглашения</a> и <a className='text-[white] cursor-pointer'>Политики
                                                    конфиденциальности</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:flex-row gap-3 md:gap-3.5 mt-2'>
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-xl border border-solid border-medium_grey px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300"
                                                onClick={() => reset()}
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
                                    <div className='mt-4 text-center'>
                                        <p className='text-caption_r_desk text-medium_grey'>Есть аккаунт?<a
                                            className='text-[white]'
                                            href='/form/sign-in'> Войти</a></p>
                                    </div>
                                </>
                        }

                    </div>
    );
});
