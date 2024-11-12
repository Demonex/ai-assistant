import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { ISignUpFormInputs } from '../types/types.js';
import { FormInputError } from '@/shared/ui/FormUi/FormInputError.js';

interface EmailInputProps {
    register: UseFormRegister<ISignUpFormInputs>;
    error: FieldError | undefined;
}

export const EmailInput = (props: EmailInputProps) => {
    const { register, error } = props;

    return (
        <div>
            <label htmlFor="email" className="text-caption_m_desk text-medium_grey">
                Email <span className='text-secondary_red'>*</span>
            </label>
            <div className="mt-1.5">
                <input
                    type="email"
                    autoComplete="email"
                    className={`block w-full border-solid  rounded-xl border border-dark_grey p-[.875rem] text-white !bg-[transparent] ${error ? '  ring-0 border-secondary_red focus:border-secondary_red focus:ring-0' : 'focus:ring-0 focus:border-medium_grey'} text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey`}
                    {...register('email', {required: 'Email необходим'})}
                    placeholder='Введи email или логин'
                />
                {error && <FormInputError message={error.message} /> }
            </div>
        </div>
    );
};
