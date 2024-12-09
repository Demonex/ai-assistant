import {memo, type SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
  className?: string
}

const SecondaryCloseIcon = memo<Props>(({
                                    className
                                }) => {
    return (
        <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M24.5 24.5 14 14m0 0L3.5 3.5M14 14 24.5 3.5M14 14 3.5 24.5" stroke="" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
})
export default SecondaryCloseIcon
