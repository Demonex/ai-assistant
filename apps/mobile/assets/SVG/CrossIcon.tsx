import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CrossIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="white"
      d="m14.186 12.78 10.11-10.112a1.099 1.099 0 0 0-1.555-1.547L12.63 11.233 2.52 1.121A1.099 1.099 0 0 0 .973 2.668l10.11 10.113L.973 22.893a1.098 1.098 0 1 0 1.547 1.548l10.11-10.112L22.74 24.44a1.099 1.099 0 0 0 1.548-1.548L14.186 12.781Z"
    />
  </Svg>
)
export default CrossIcon
