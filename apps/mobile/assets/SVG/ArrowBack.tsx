import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"
const ArrowBack = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      // style={{
      //   maskType: "alpha",
      // }}
    >
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#fff"
        d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6L12 20Z"
      />
    </G>
  </Svg>
)
export default ArrowBack
