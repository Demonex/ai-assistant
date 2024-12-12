import * as React from "react"
import Svg, { Path } from "react-native-svg"
const TIDLogo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={62}
    height={27}
    fill="none"
    {...props}
  >
    <Path
      fill="#FFDD2D"
      d="M.624.34h25.763v13.003a9.342 9.342 0 0 1-4.648 8.082l-8.234 4.77-8.233-4.77a9.334 9.334 0 0 1-4.648-8.082V.34Z"
    />
    <Path
      fill="#333"
      fillRule="evenodd"
      d="M7.692 7.185v4.042c.553-.626 1.552-1.048 2.698-1.048h1.244v4.703c0 1.252-.338 2.345-.842 2.949h5.415c-.5-.604-.838-1.697-.838-2.946v-4.702h1.244c1.146 0 2.15.422 2.698 1.048V7.188H7.688l.004-.003Z"
      clipRule="evenodd"
    />
    <Path
      fill="#303030"
      d="M41.095 20.153V4.873h-4.802v15.28h4.802ZM52.67 20.153c6.076 0 9.082-3.243 9.082-7.64 0-4.398-3.01-7.64-8.572-7.64H44.61v15.28h8.064-.004ZM52.184 8.53c3.295 0 4.67 1.479 4.67 3.982 0 2.312-1.371 4.077-4.67 4.077h-2.943V8.53h2.943Z"
    />
  </Svg>
)
export default TIDLogo
