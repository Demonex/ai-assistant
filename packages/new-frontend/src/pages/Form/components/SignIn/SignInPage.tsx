import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {navigate} from 'wouter/use-browser-location';
import {useForm} from 'react-hook-form';
import {useLazyFetch} from '../../../../hooks/useFetch.js';
import {ErrorPage} from '../../../404/Error.js';
import get from 'lodash.get';
import capitalize from 'lodash.capitalize';
import {BACKEND_URL} from '../../../../constants/index.js';
import {useAccount} from '../../../../components/Header/hooks/useAccount.js';
import hiddenPassword from '/assets/svg/hidden_password.svg';
import shownPassword from '/assets/svg/shown_password.svg';
import yandex from '/assets/svg/yandex_id.svg';
import vk from '/assets/svg/vk_id.svg';
import google from '/assets/svg/Google_id.svg';
import sber from '/assets/svg/sber_id.svg';
import tBank from '/assets/svg/tb_id.svg';
import alfa from '/assets/svg/alfa_id.svg';
import {Link} from "wouter";

const signInSocialsOptions = [
    {
        name: 'яндекс',
        icon: yandex,
        color: '#FC3F1D',
        link: ''
    },
    {
        name: 'вк',
        icon: vk,
        color: '#4B729F',
        link: ''
    },
    {
        name: 'вк',
        icon: google,
        color: '#FFFFFF',
        link: ''
    },
    {
        name: 'сбер',
        icon: sber,
        color: '#25B840',
        link: ''
    },
    {
        name: 'т-банк',
        icon: tBank,
        color: '#FFFFFF',
        link: ''
    },
    {
        name: 'альфа',
        icon: alfa,
        color: '#EE2A23',
        link: ''
    },
]
export const SignInPage = memo(() => {
    const {
        setProfile,
        profile
    } = useAccount();

    const [signInOption, setSignInOption] = useState('email');
    const [showPassword, setShowPassword] = useState(false);
    const ref = useRef(null)
    const switcherHeight = ref.current?.clientHeight - 8
    const {
        register, handleSubmit, formState: {
            errors
        },
        setError,
        clearErrors,
        setValue
    } = useForm();
    const [{data, error}, fetchSignIn] = useLazyFetch({
        url: `${BACKEND_URL}/auth/email/sign-in`,
        method: 'post',
        cache: false
    });

    const onSubmit = useCallback(data => {
        fetchSignIn({data}).catch(console.error);
    }, []);

    useEffect(() => {
        if (get(error, 'response.status') !== 401) {
            return;
        }
        error?.response.data.messages.forEach((item, index) => {

            setError(`email`, {
                message: 'Учётная запись не найдена'
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
        <>
            <div
                className="p-0 md:p-10 shadow rounded-2xl  md:bg-popup_gray w-full flex flex-col gap-4 md:gap-5 mb-[7.5rem] md:mb-[unset]">
                <h1 className='text-t1Semi_mob lg:text-t1Semi_deck'>Вход в аккаунт</h1>
                <div className='w-full border border-dark_grey rounded-[30px] p-1.5 flex justify-between relative'
                     ref={ref}>
                    <button onClick={() => setSignInOption('email')}
                            className={`px-10 py-2 rounded-[22px] w-1/2 text-btnText z-20  whitespace-nowrap ${signInOption === 'email' ? 'text-[white]  transition duration-200' : 'text-medium_grey '}`}>По
                        email
                    </button>
                    <button onClick={() => setSignInOption('socials')}
                            className={`px-10 py-2 rounded-[22px] w-1/2 text-btnText z-20 ${signInOption === 'socials' ? 'text-[white]  transition duration-200' : 'text-medium_grey'} whitespace-nowrap`}
                    > Через соцсети
                    </button>
                    <div style={{
                        height: `42px`,
                        // display: !switcherHeight ? 'none' : undefined
                    }}
                         className={`w-1/2 absolute bg-primary_blue h-full rounded-[22px]  ${signInOption === 'socials' ? '-left-1 top-1 translate-x-full transition duration-300' : 'left-1 top-1  transition duration-200'}`}/>
                </div>
                {
                    signInOption === 'email'
                        ? <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email"
                                       className="text-caption_m_desk text-medium_grey">
                                    Email или логин <span className='text-secondary_red'>*</span>
                                </label>
                                <div className="mt-1.5">
                                    <input
                                        placeholder='Введи email или логин'
                                        type="email"
                                        autoComplete="email"
                                        className={`block w-full rounded-xl border-solid border border-dark_grey p-[.875rem] text-white !bg-[transparent] ${errors.email ? '  ring-0 border-secondary_red focus:border-secondary_red focus:ring-0' : 'focus:ring-0 focus:border-medium_grey'} text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey`}
                                        {...register('email', {required: 'Email обязателен'})}
                                        onChange={({target: {value}}) => {
                                            setValue('email', value);
                                            clearErrors('email');
                                        }}

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
                                        className={`flex w-full rounded-xl border border-dark_grey p-[.875rem]  ${errors.email ? '  ring-0 border-secondary_red focus:border-secondary_red ' : 'focus:ring-0 focus:border-medium_grey'} `}>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="current-password"
                                            className=' !bg-[transparent] border-none p-0 text-white text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey focus:ring-0 w-full'
                                            {...register('password', {required: 'Пароль обязателен'})}
                                            onChange={({target: {value}}) => {
                                                setValue('password', value);
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
                                    {errors.password &&
                                        <p
                                            className="text-secondary_red text-caption_m_desk mt-1.5">{capitalize(String(errors.password.message))}</p>}
                                </div>
                            </div>

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
                                    <a href="/password-recovery" className=" hover:text-primary_blue">
                                        Восстановить пароль
                                    </a>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-3 md:gap-3.5 mt-2'>
                                <button
                                    type="submit"
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
                        : <div className='py-4 w-full flex flex-col gap-9 '>
                            <div className='grid grid-cols-3 gap-4'>
                                {
                                    signInSocialsOptions.map((option, index) => (
                                        <button key={index}
                                                className='px-5 md:px-11 py-[1.125rem] flex justify-center items-center rounded-xl hover:scale-105 transition duration-300'
                                                style={{backgroundColor: `${option.color}`}}>
                                            <img src={option.icon} className='h-6'/>
                                        </button>
                                    ))
                                }
                            </div>
                            <button
                                className="flex w-full justify-center rounded-xl border border-solid border-medium_grey px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300">
                                Отмена
                            </button>
                        </div>
                }
                <div className='mt-4 text-center'>
                    <p className='text-caption_r_desk text-medium_grey'>Нет аккаунта? <Link className='text-[white] hover:text-medium_grey'
                                                                                         to='/auth/sign-up'>Создать</Link>
                    </p>
                </div>
            </div>
        </>

    );
});
