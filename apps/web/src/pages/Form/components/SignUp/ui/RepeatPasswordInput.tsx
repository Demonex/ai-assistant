import shownPassword from "/assets/svg/shown_password.svg";
import hiddenPassword from "/assets/svg/hidden_password.svg";
import { useState } from 'react';
import { FormInputError } from '@/shared/ui/FormUi/FormInputError.js';

export const RepeatPasswordInput = ({register, error, passwordRef}) => {
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

	return (
		<div>
            <label htmlFor="password"
                   className="text-caption_m_desk text-medium_grey">
                Пароль ещё раз <span className='text-secondary_red'>*</span>
            </label>
            <div className="mt-1.5">
                <div
                    className={`flex w-full rounded-xl border border-dark_grey p-[.875rem]  ${error ? '  ring-0 border-secondary_red focus:border-secondary_red ' : 'focus:ring-0 focus:border-medium_grey'} `}>
                    <input
                        type={showPasswordRepeat ? 'text' : 'password'}
                        autoComplete="current-password"
                        className=' !bg-[transparent] border-none p-0 text-white text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey focus:ring-0 w-full'
                        {...register('repeatPassword', {
                            validate: value => (value === passwordRef.current && value.length > 0 || 'Пароли не совпадают'),
                            /*pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: 'Пароль должен содержать не менее 8 символов, по крайней мере одну заглавную и одну прописную буквы, одну цифру и спецсимвол '
                            }*/
                        })}
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
                {error && <FormInputError message={error.message} />} 
            </div>
        </div>
	);
};
