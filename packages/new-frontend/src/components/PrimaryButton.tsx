import {forwardRef} from "react";

type PrimaryButtonProps = {
  title: string;
  icon?: string;
  className?: string;
  isIcon: boolean
  style?: React.CSSProperties;
  titleClassName?:string;
  iconClassName?:string;
  titleStyle?: React.CSSProperties;
}
const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(({icon, title, className, isIcon, style, titleStyle, titleClassName,iconClassName}, ref) => {
  return (
    <button className={`${className}  hover:scale-105 transition-all duration-300 `} ref={ref} style={style}>
      {
        isIcon
          ? <img src={icon} alt="" className={iconClassName}/>
          : null
      }
      <p className={`${titleClassName} `} style={titleStyle}>{title}</p>
    </button>
  )
})
export default PrimaryButton
