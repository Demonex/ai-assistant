import * as React from "react"
import Svg, { G, Rect, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const HandleIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={5}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect
        width={28}
        height={4.588}
        y={0.176}
        fill="#AEAEAE"
        fillOpacity={0.5}
        rx={2.294}
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default HandleIcon
