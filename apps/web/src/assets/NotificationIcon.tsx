import {memo, type SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
  className?: string
}

const NotificationIcon = memo<Props>(({
                                    className
                                }) => {
    return (
      <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          d="M20.0003 9.66667C24.6026 9.66667 28.3336 13.3976 28.3336 18V21.7327C28.3336 22.549 28.6333 23.337 29.1756 23.9472L31.3016 26.3392C32.7348 27.9513 31.5903 30.5 29.4331 30.5H10.5674C8.41027 30.5 7.26576 27.9513 8.69886 26.3392L10.825 23.9472C11.3673 23.337 11.6669 22.549 11.6669 21.7327L11.667 18C11.667 13.3976 15.3979 9.66667 20.0003 9.66667ZM20.0003 9.66667V5.5M18.3335 35.5H21.6668"
          stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>


    )
})
export default NotificationIcon
