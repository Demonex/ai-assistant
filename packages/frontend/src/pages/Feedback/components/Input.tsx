import {memo} from "react";

type Props = {
    labelName: string;
    placeholder: string;
    type: 'email' | 'text'| 'tel';
    style?: React.CSSProperties;
}
const Input = memo(({
                        labelName,
                        placeholder,
                        type,
                        style
                    }: Props) => {
    return (
        <div className='flex flex-col gap-1.5'>
            <label className='text-captionText font-medium text-medium_grey'>{labelName}<span
                className='text-[#FF4633] ml-1'>*</span></label>
            <input className={`rounded-xl px-3.5 py-2.5 md:py-[1rem] border border-solid border-dark_grey placeholder:text-medium_grey placeholder:text-t2Regular bg-[transparent] `}
                   placeholder={placeholder} type={type} style={style}/>
        </div>
    )
})
export default Input