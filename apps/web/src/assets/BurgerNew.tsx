import {memo, type SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: string | number;
  height?:string | number
}

const Burger = memo<Props>(({
                                    color = "white",
                                    width,
                                    height,
                                    ...rest
                                  }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 46 44" width={width} height={height} {...rest}>
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M1 37h25.143M1 22h44M1 7h25.143"/>
    </svg>
  )
})
export default Burger
