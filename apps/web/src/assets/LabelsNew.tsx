import {memo, type SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number | string;
  height?: number | string
}

const LabelsNew = memo<Props>(({
                                 color = "white",
                                 width,
                                 height,
                                 ...rest
                               }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20" width={width} height={height} {...rest}>
      <g clipPath="url(#a)">
        <path fill={color} fillRule="evenodd"
              d="M10.84 1.576c-4.632 0-8.424 3.792-8.424 8.424s3.792 8.424 8.424 8.424 8.424-3.792 8.424-8.424-3.792-8.424-8.424-8.424ZM1.083 10c0-5.368 4.389-9.758 9.757-9.758 5.368 0 9.758 4.39 9.758 9.758 0 5.368-4.39 9.758-9.758 9.758-5.368 0-9.757-4.39-9.757-9.758ZM12.96 3.995a.667.667 0 0 1 .884-.328C16.263 4.775 17.87 7.192 17.87 10a.667.667 0 0 1-1.333 0c0-2.283-1.301-4.23-3.247-5.121a.667.667 0 0 1-.329-.884Zm-2.12 3.944c-1.178 0-2.062.884-2.062 2.061s.884 2.06 2.061 2.06 2.06-.883 2.06-2.06-.883-2.06-2.06-2.06ZM7.445 10c0-1.914 1.48-3.394 3.394-3.394 1.914 0 3.394 1.48 3.394 3.394 0 1.914-1.48 3.394-3.394 3.394-1.914 0-3.394-1.48-3.394-3.394Zm-2.97-.667c.369 0 .667.299.667.667 0 2.03 1.142 3.908 2.767 4.883a.667.667 0 1 1-.686 1.143C5.214 14.82 3.81 12.516 3.81 10c0-.368.298-.667.666-.667Z"
              clipRule="evenodd"/>
      </g>
      <defs>
        <clipPath id="a">
          <path fill={color} d="M.84 0h20v20h-20z"/>
        </clipPath>
      </defs>
    </svg>

  )
})
export default LabelsNew
