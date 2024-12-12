import * as React from "react"
import Svg, { Path } from "react-native-svg"
const InstagramLogo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M12.047 0H3.954A3.957 3.957 0 0 0 0 3.953v8.094A3.957 3.957 0 0 0 3.953 16h8.095A3.956 3.956 0 0 0 16 12.047V3.953A3.957 3.957 0 0 0 12.047 0Zm2.434 12.047a2.437 2.437 0 0 1-2.434 2.434H3.954a2.437 2.437 0 0 1-2.434-2.434V3.953a2.437 2.437 0 0 1 2.434-2.434h8.095a2.437 2.437 0 0 1 2.433 2.434v8.094Z"
    />
    <Path
      fill="#fff"
      d="M8 4.19a3.81 3.81 0 1 0 0 7.62 3.81 3.81 0 0 0 0-7.62Zm0 6.101A2.291 2.291 0 1 1 8 5.71a2.291 2.291 0 0 1 0 4.582ZM11.966 3.017a1.017 1.017 0 1 0 0 2.033 1.017 1.017 0 0 0 0-2.033Z"
    />
  </Svg>
)
export default InstagramLogo
