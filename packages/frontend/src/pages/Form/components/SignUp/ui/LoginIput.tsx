import capitalize from 'lodash.capitalize';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { ISignUpFormInputs } from '../types/types.js';

interface LoginInputProps {
    register: UseFormRegister<ISignUpFormInputs>;
    error: FieldError | undefined;
}

export const LoginInput = (props: LoginInputProps) => {
    const { register, error } = props;
    
	return (
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
                    placeholder='Придумай логин'
                />
            </div>
            {error &&
                <p className="text-secondary_red text-caption_m_desk mt-1.5">{capitalize(String(error.message))}</p>
            }
        </div>
	);
};
