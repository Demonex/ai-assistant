import type { Dispatch, SetStateAction } from 'react';
import type { SignInMethod } from '../types/types.js';

interface SelectSignInMethodProps {
	signInOption: SignInMethod;
	setSignInOption: Dispatch<SetStateAction<SignInMethod>>;
}

export const SelectSignInMethod = (props: SelectSignInMethodProps) => {
	const { signInOption, setSignInOption } = props;
	
	return (
		<div 
			className='w-full border border-dark_grey rounded-[30px] p-1.5 flex justify-between relative'
        >
            <button onClick={() => setSignInOption('email')}
                    className={`px-10 py-2 rounded-[22px] w-1/2 text-btnText z-20  whitespace-nowrap ${signInOption === 'email' ? 'text-[white]  transition duration-200' : 'text-medium_grey '}`}>По
                email
            </button>
            <button onClick={() => setSignInOption('socials')}
                    className={`px-10 py-2 rounded-[22px] w-1/2 text-btnText z-20 ${signInOption === 'socials' ? 'text-[white]  transition duration-200' : 'text-medium_grey'} whitespace-nowrap`}
            > Через соцсети
            </button>
            <div style={{
                height: "42px",
                // display: !switcherHeight ? 'none' : undefined
            }}
                 className={`w-1/2 absolute bg-primary_blue h-full rounded-[22px]  ${signInOption === 'socials' ? '-left-1 top-1 translate-x-full transition duration-300' : 'left-1 top-1  transition duration-200'}`}/>
        </div>
	);
};
