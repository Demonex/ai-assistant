import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BurgerIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="white"
      d="M29.333 0H.667C.298 0 0 .318 0 .711v.356c0 .392.298.71.667.71h28.666c.369 0 .667-.318.667-.71V.71C30 .318 29.701 0 29.333 0ZM29.333 8.711H.667c-.369 0-.667.319-.667.711v.356c0 .393.298.71.667.71h28.666c.369 0 .667-.317.667-.71v-.356c0-.393-.299-.71-.667-.71ZM29.333 17.422H.667c-.369 0-.667.319-.667.711v.356c0 .393.298.711.667.711h28.666c.369 0 .667-.318.667-.711v-.356c0-.392-.299-.71-.667-.71Z"
    />
  </Svg>
)
export default BurgerIcon
