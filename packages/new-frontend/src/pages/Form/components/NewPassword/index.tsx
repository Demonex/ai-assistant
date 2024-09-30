import {memo, useCallback, useState} from "react";
import capitalize from "lodash.capitalize";
import {Link} from "wouter";
import {useForm} from "react-hook-form";
import {useLazyFetch} from "../../../../hooks/useFetch.js";
import {BACKEND_URL} from "../../../../constants/index.js";
import shownPassword from "/assets/svg/shown_password.svg";
import hiddenPassword from "/assets/svg/hidden_password.svg";

export const NewPassword = memo(() => {
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [comparePassword, setComparePassword] = useState('');
    const {
        register, handleSubmit, formState: {
            errors
        },
        setError,
        clearErrors,
        setValue,
    } = useForm({criteriaMode: 'all'});
    const [{data, error}, fetchSignUp] = useLazyFetch({
        url: `${BACKEND_URL}/auth/email/sign-up`,
        method: 'post',
        cache: false
    });
    const onSubmit = useCallback(data => {
        console.log('data', data)
        // fetchSignUp({data}).catch(console.error);

    }, []);
    return (
        <div
            className="p-0 md:p-10 shadow rounded-2xl  md:bg-popup_gray w-full flex flex-col gap-4 md:gap-5 mb-[7.5rem] lg:mb-[unset]">
            {
                passwordChanged
                    ? <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-t1Mobile lg:text-t1Regular'>Пароль был успешно изменен</h2>
                            <p className='text-t2Regular lg:text-t2Regular text-medium_grey'>Ты снова можешь пользоваться
                                всеми преимуществами личного кабинета.</p>
                        </div>
                        <a href='/form/sign-in'>
                            <button
                                className="flex w-full justify-center rounded-xl bg-primary_blue px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300"
                            >
                                Войти
                            </button>
                        </a>
                    </div>
                    : <>
                        <h1 className='text-t1Semi_mob lg:text-t1Semi_deck'>Восстановление пароля</h1>
                        <form className="flex flex-col gap-4"
                              onSubmit={handleSubmit(onSubmit)}
                        >
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
                                                ? <button onClick={() => setShowPassword(!showPassword)}>
                                                    <img src={shownPassword}/>
                                                </button>
                                                : <button onClick={() => setShowPassword(!showPassword)}>
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
                                                validate: value => value === comparePassword || 'Пароли не совпадают',
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                    message: 'Пароль должен содержать не менее 8 символов, по крайней мере одну заглавную и одну прописную буквы, одну цифру и спецсимвол '
                                                }
                                            })}
                                            onChange={({target: {value}}) => {
                                                setValue('password', value);
                                                clearErrors('password');
                                            }}
                                        />
                                        {
                                            showPasswordRepeat
                                                ? <button
                                                    onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}>
                                                    <img src={shownPassword}/>
                                                </button>
                                                : <button
                                                    onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}>
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
                            <div className='flex flex-col md:flex-row gap-3 md:gap-3.5 mt-2'>
                                <Link className='w-full' to='/form/sign-in'>
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