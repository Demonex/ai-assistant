import * as React from "react"
import Svg, {Path} from "react-native-svg"

const SearchIcon = ({ color }) => (
  <Svg
    width={17}
    height={17}
    style={{
      display: "inline-block",
      verticalAlign: "middle",

    }}
    viewBox="0 0 1024 1024"
    {...color}
  >
    <Path
      d="M230.606 138.046c175.915-184.059 464.274-184.059 641.509 0s177.246 483.497 0 666.194c-170.631 177.191-444.434 184.057-622.994 19.232L63.937 1015.769c-10.587 10.983-26.459 10.983-37.031 0s-10.587-27.479 0-38.462L212.09 785.01C53.363 599.572 58.65 315.25 230.613 138.061zm37.031 627.725c156.075 162.08 411.36 162.08 567.451 0s156.078-427.177 0-589.257-411.36-162.08-567.451 0-156.075 427.177 0 589.257z"
      fill={color} fillOpacity={1}

    />
  </Svg>
)
export default SearchIcon
