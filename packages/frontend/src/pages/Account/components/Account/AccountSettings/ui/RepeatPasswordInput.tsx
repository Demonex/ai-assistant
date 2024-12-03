import shownPassword from "/assets/svg/shown_password.svg";
import hiddenPassword from "/assets/svg/hidden_password.svg";
import { useState } from 'react';
import { FormInputError } from '@/shared/ui/FormUi/FormInputError.js';

export const RepeatPasswordInput = ({register, error, passwordRef}) => {
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

	return (
		<div>
            <label htmlFor="confirm-password"
                   className="text-caption_m_desk text-medium_grey">
                Пароль ещё раз <span className='text-secondary_red'>*</span>
            </label>
            <div className="mt-1.5">
                <div
                    className={'w-full rounded-xl border border-solid border-medium_grey py-2.5 px-3.5  text-white  text-caption_r_desk flex justify-between'}>
                    <input
                        id='confirm-password'
                        type={showPasswordRepeat ? 'text' : 'password'}
                        autoComplete="off"
                        className='w-full bg-[transparent] p-0'
                        {...register('repeatPassword', {
                            validate: value => (value === passwordRef.current || 'Пароли не совпадают'),
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
