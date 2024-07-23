import {forwardRef} from "react";

type PrimaryButtonProps = {
  title: string;
  icon?: string;
  className?: string;
}
const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(({icon, title, className}, ref) => {

  return (
    <button className={className} ref={ref} style={{

    }}>
      <img src={icon} alt="" className='w-[36px] md:w-[40px]'/>
      <p className="font-medium 2xl:text-[28px] text-[20px]">{title}</p>
    </button>
  )
})
export default PrimaryButton
