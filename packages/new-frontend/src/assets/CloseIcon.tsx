import {memo, SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
  className?: string
}

const CloseIcon = memo<Props>(({
                                    className
                                }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" className={className}>
            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M35 35 20 20m0 0L5 5m15 15L35 5M20 20 5 35"/>
        </svg>
    )
})
export default CloseIcon
