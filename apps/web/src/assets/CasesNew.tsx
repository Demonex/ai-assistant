import {memo, type SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: string | number;
  height?:string | number
}

const CasesNew = memo<Props>(({
                                    color = "white",
                                    width,
                                    height,
                                    ...rest
                                  }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 21 20" {...rest} height={height} width={width}>
      <path fill=''
            d="M12.03 0 1.436 10.7c-.357.4-.595.6-.595.8 0 .2.12.3.238.4.12.1.476.1 1.072.1h8.69l-1.19 8L20.245 9.3c.357-.4.595-.6.595-.8 0-.2-.119-.3-.238-.4-.119-.1-.357-.1-1.071-.1h-8.69l1.19-8Z"/>
    </svg>
  )
})
export default CasesNew
