import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { ISignInFormInputs } from '../../types/types.js';
import { useState } from 'react';
import hiddenPassword from '/assets/svg/hidden_password.svg';
import shownPassword from '/assets/svg/shown_password.svg';
import { FormInputError } from '@/shared/ui/FormUi/FormInputError.js';

interface PasswordIputProps {
    register: UseFormRegister<ISignInFormInputs>;
    error: FieldError | undefined;
}

export const PasswordInput = (props: PasswordIputProps) => {
	const {register, error } = props;
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
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        className=' !bg-[transparent] border-none p-0 text-white text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey focus:ring-0 w-full'
                        {...register('password', {required: 'Пароль обязателен'})}
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
	)
}