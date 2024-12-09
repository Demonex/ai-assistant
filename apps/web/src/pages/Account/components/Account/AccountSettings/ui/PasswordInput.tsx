import shownPassword from "/assets/svg/shown_password.svg";
import hiddenPassword from "/assets/svg/hidden_password.svg";
import { useState } from 'react';
import type { MutableRefObject } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import { FormInputError } from '@/shared/ui/FormUi/FormInputError.js';
import type { IUpdateProfileFormInputs } from '../types/types.js';

interface PasswordIputProps {
    register: UseFormRegister<IUpdateProfileFormInputs>;
    error: FieldError | undefined;
    passwordRef: MutableRefObject<string>;
}

export const PasswordInput = (props: PasswordIputProps) => {
    const {register, error, passwordRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div>
            <label htmlFor="new-password"
                className="text-caption_m_desk text-medium_grey">
                Новый пароль
            </label>
            <div className="mt-1.5">
                <div
                    className={"w-full rounded-xl border border-solid border-medium_grey py-2.5 px-3.5  text-white text-caption_r_desk flex justify-between"}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className='w-full bg-[transparent] p-0'
                        {...register('password', {
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
                {error && <FormInputError message={error.message} /> }
            </div>
        </div>
    );
};