import { signInSocialsOptions } from '../lib/signInSocialsOptions/signInSocialsOptions.js';

export const ServicesSignIn = () => {
	return (
		<div className='grid grid-cols-3 gap-4'>
            {
                signInSocialsOptions.map((option, index) => (
                    <button key={index}
                            className='px-5 md:px-11 py-[1.125rem] flex justify-center items-center rounded-xl hover:scale-105 transition duration-300'
                            style={{backgroundColor: `${option.color}`}}>
                        <img src={option.icon} className='h-6'/>
                    </button>
                ))
            }
        </div>
	);
};
