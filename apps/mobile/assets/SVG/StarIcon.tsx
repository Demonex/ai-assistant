import * as React from "react"
import Svg, { Path } from "react-native-svg"
const StarIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m16.097 6.913-3.751 3.546 1.05 5.179a.543.543 0 0 1-.2.539.488.488 0 0 1-.55.03L8.258 13.57l-4.382 2.638a.49.49 0 0 1-.551-.03.544.544 0 0 1-.198-.539l1.05-5.179L.418 6.913a.547.547 0 0 1-.136-.553.513.513 0 0 1 .421-.363l5.029-.56L7.795.593a.507.507 0 0 1 .463-.315c.2 0 .382.123.463.315l2.063 4.837 5.028.56c.196.025.36.166.421.363a.547.547 0 0 1-.136.553v.007Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default StarIcon
