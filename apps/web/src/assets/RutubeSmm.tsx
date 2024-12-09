import {memo, type SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: string | number;
  height?:string | number
}

const RutubeSmm = memo<Props>(({
                                    color = "white",
                                    width,
                                    height,
                                    ...rest
                                  }) => {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} {...rest}>
          <path fill=""
                d="M23.854 4.293H2V28h6.083v-7.712h11.655L25.056 28h6.81l-5.863-7.748c1.82-.284 3.132-.96 3.933-2.026.802-1.066 1.202-2.772 1.202-5.047v-1.777c0-1.35-.145-2.417-.4-3.234-.255-.818-.692-1.529-1.312-2.169a5.963 5.963 0 0 0-2.258-1.314c-.874-.25-1.967-.392-3.314-.392Zm-.984 10.77H8.083V9.518H22.87c.838 0 1.42.142 1.712.391.291.249.474.71.474 1.386v1.99c0 .711-.183 1.173-.474 1.422-.291.249-.874.356-1.712.356ZM30.562 3.92c1.133 0 2.052-.877 2.052-1.96S31.695 0 30.563 0c-1.135 0-2.054.877-2.054 1.96s.92 1.96 2.054 1.96Z"/>
      </svg>
  )
})
export default RutubeSmm
