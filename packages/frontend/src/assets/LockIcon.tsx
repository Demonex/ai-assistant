import {memo, SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
  className?: string
}

const LockIcon = memo<Props>(({
                                    className
                                }) => {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          d="M2.66699 21.334C2.66699 17.5628 2.66699 15.6772 3.83857 14.5056C5.01014 13.334 6.89575 13.334 10.667 13.334H21.3337C25.1049 13.334 26.9905 13.334 28.1621 14.5056C29.3337 15.6772 29.3337 17.5628 29.3337 21.334C29.3337 25.1052 29.3337 26.9908 28.1621 28.1624C26.9905 29.334 25.1049 29.334 21.3337 29.334H10.667C6.89575 29.334 5.01014 29.334 3.83857 28.1624C2.66699 26.9908 2.66699 25.1052 2.66699 21.334Z"
          stroke="" strokeWidth="1.6"/>
        <path d="M16 18.666V23.9993" stroke="#E4FF29" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M8 13.3327V10.666C8 6.24774 11.5817 2.66602 16 2.66602C20.4183 2.66602 24 6.24774 24 10.666V13.3327"
              stroke="" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>


    )
})
export default LockIcon
