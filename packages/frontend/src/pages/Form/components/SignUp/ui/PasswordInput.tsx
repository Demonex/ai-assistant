import capitalize from 'lodash.capitalize';
import shownPassword from "/assets/svg/shown_password.svg";
import hiddenPassword from "/assets/svg/hidden_password.svg";
import { useState } from 'react';
import type { MutableRefObject } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { ISignUpFormInputs } from '../types/types.js';

interface PasswordIputProps {
    register: UseFormRegister<ISignUpFormInputs>;
    error: FieldError | undefined;
    passwordRef: MutableRefObject<string>;
}

export const PasswordIput = (props: PasswordIputProps) => {
    const {register, error, passwordRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div>
            <label htmlFor="password"
                className="text-caption_m_desk text-medium_grey">
                Пароль <span className='text-secondary_red'>*</span>
            </label>
            <div className="mt-1.5">
                <div
                    className={`flex w-full rounded-xl border border-dark_grey p-[.875rem]  ${error ? '  ring-0 border-secondary_red focus:border-secondary_red ' : 'focus:ring-0 focus:border-medium_grey'} `}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        className=' !bg-[transparent] border-none p-0 text-white text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey focus:ring-0 w-full'
                        {...register('password', {
                            required: 'Пароль обязателен',
                            maxLength: {
                                value: 256,
                                message: 'Пароль не должен превышать 256 символов'
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'Пароль должен содержать не менее 8 символов (латинские буквы и цифры)',
                            },
                            onChange: (e) => {
                                passwordRef.current = e.target.value;
                            },
                        })}
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
                {error &&
                    <p className="text-secondary_red text-caption_m_desk mt-1.5">{capitalize(String(error.message))}</p>}
            </div>
        </div>
    );
};