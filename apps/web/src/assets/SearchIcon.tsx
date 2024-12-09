import {memo, type SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: string | number;
  height?: string | number
}

const SearchIcon = memo<Props>(({
                                  color = "",
                                  width,
                                  height,
                                  ...rest
                                }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" width={width} height={height} {...rest}>
      <path fill={color}
            d="m21.736 20.592-5.104-5.016c1.496-1.672 2.288-3.784 2.288-6.072 0-5.192-4.224-9.416-9.416-9.416S.088 4.312.088 9.504s4.224 9.416 9.416 9.416c2.2 0 4.136-.704 5.984-2.2l5.104 5.016c.176.176.352.176.528.176.176 0 .352-.088.528-.264.088-.088.176-.176.176-.352.176-.176.088-.44-.088-.704Zm-4.4-11.088c0 4.4-3.52 7.92-7.832 7.92-4.312 0-7.832-3.52-7.832-7.832 0-4.4 3.52-7.92 7.832-7.92 4.312 0 7.832 3.432 7.832 7.832Z"/>
    </svg>
  )
})
export default SearchIcon
