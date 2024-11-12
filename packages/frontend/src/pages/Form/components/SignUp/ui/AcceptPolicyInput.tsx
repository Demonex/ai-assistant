import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { ISignUpFormInputs } from '../types/types.js';
import { FormInputError } from '@/shared/ui/FormUi/FormInputError.js';

interface AcceptPolicyInputProps {
    register: UseFormRegister<ISignUpFormInputs>;
    error: FieldError | undefined;
}

export const AcceptPolicyInput = (props: AcceptPolicyInputProps) => {
    const { register, error } = props;

	return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-start">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        defaultChecked={false}
                        className="h-6 w-6 rounded border-solid border-dark_grey bg-popup_gray "
                        {...register('policyAccepted', {required: 'Необходимо согласиться с условиями'})}
                    />
                    <label htmlFor="remember-me"
                        className="ml-2 text-caption_r_desk text-medium_grey">
                        Согласен с условиями <a className='text-[white] cursor-pointer hover:text-medium_grey'>Пользовательского
                        соглашения</a> и <a className='text-[white] cursor-pointer hover:text-medium_grey'>Политики
                        конфиденциальности</a>
                    </label>
                </div>
            </div>
            {error && <FormInputError message={error.message} /> }
        </div>
	);
};
