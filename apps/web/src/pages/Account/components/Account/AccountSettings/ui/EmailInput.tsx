import type { FieldError, UseFormRegister } from 'react-hook-form';
import { FormInputError } from '@/shared/ui/FormUi/FormInputError.js';
import type { IUpdateProfileFormInputs } from '../types/types.js';

interface EmailInputProps {
    register: UseFormRegister<IUpdateProfileFormInputs>;
    error: FieldError | undefined;
    defaultValue: string | undefined;
}

export const EmailInput = (props: EmailInputProps) => {
    const { register, error, defaultValue } = props;

    return (
        <div>
            <label htmlFor="email" className="text-caption_m_desk text-medium_grey">
                Email
            </label>
            <div className="mt-1.5">
                <input
                    type="email"
                    autoComplete="off"
                    className={"w-full rounded-xl border border-solid border-medium_grey py-2.5 px-3.5 bg-[transparent] text-white text-caption_r_desk"}
                    {...register('email', {maxLength: 256})}
                    defaultValue={defaultValue}
                />
                {error && <FormInputError message={error.message} /> }
            </div>
        </div>
    );
};
