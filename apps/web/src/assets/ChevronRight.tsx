import {memo, type SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
    className?: string
    color?: string
    width?: string | number
    height?: string | number
}

const ChevronRight = memo<Props>(({
                                      className,
                                      color,
                                      width,
                                      height
                                  }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 12 12" fill={color} xmlns="http://www.w3.org/2000/svg"
             className={className}>
            <path
                d="M3.26183 0.0660324C3.14381 0.0660324 3.02579 0.111081 2.93583 0.201045C2.75577 0.380973 2.75577 0.672993 2.93583 0.852921L8.07615 5.99338L2.93583 11.1337C2.75577 11.3138 2.75577 11.6056 2.93583 11.7857C3.11589 11.9656 3.40777 11.9656 3.58783 11.7857L9.05416 6.31938C9.23422 6.13945 9.23422 5.84743 9.05416 5.6675L3.58783 0.201177C3.49787 0.11108 3.37985 0.0660324 3.26183 0.0660324Z"
                fill=""/>
        </svg>

    )
})
export default ChevronRight
