import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { ISignInFormInputs } from '../../types/types.js';
import { FormInputError } from '@/shared/ui/FormUi/FormInputError.js';

interface EmailLoginInputProps {
    register: UseFormRegister<ISignInFormInputs>;
    error: FieldError | undefined;
}

export const EmailLoginInput = (props: EmailLoginInputProps) => {
	const { register, error } = props;
	
	return (
		<div>
            <label htmlFor="emailLogin"
                   className="text-caption_m_desk text-medium_grey">
                Email или логин <span className='text-secondary_red'>*</span>
            </label>
            <div className="mt-1.5">
                <input
                    id='emailLogin'
                    placeholder='Введи email или логин'
                    type="text"
                    autoComplete="email"
                    className={`block w-full rounded-xl border-solid border border-dark_grey p-[.875rem] text-white !bg-[transparent] ${error ? '  ring-0 border-secondary_red focus:border-secondary_red focus:ring-0' : 'focus:ring-0 focus:border-medium_grey'} text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey`}
                    {...register('emailLogin', { required: 'Email или логин обязателен' })}
                />
                {error && <FormInputError message={error.message} />}
            </div>
        </div>
	);
};
