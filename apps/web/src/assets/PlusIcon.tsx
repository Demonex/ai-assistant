import {memo, type SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
  className?: string
  color?: string
}

const PlusIcon = memo<Props>(({
                                className,
                                color
                              }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg" className={className} stroke={color}>
      <path d="M25.6273 14H14.3136M14.3136 14H3M14.3136 14L14.3137 2.68629M14.3136 14L14.3137 25.3137"
            stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  )
})
export default PlusIcon
