
type Props = {
    width?: number | string;
    height?: number | string;
    className?: string
}
export const TidalLogoChart = ({
                             width,
                             height,
                             className,
                             ...props
                         }: Props) => (
  <svg width={width} height={height} viewBox="0 0 560 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <g clipPath="url(#clip0_1072_28330)">
      <path d="M204.553 74.7629H190.327V24.3076H171.93V12.1135H222.951V24.3076H204.553V74.7629Z" fill="white"/>
      <path d="M279.827 74.7623H265.516V12.1133H279.827V74.7623Z" fill="white"/>
      <path d="M532.342 62.3998H557.091V74.7645H518.035V12.1151H532.342V62.3998Z" fill="white"/>
      <mask id="mask0_1072_28330" maskUnits="userSpaceOnUse" x="-393" y="-1095" width="2374"
            height="3072">
        <path d="M-392.105 1976.74H1980.8V-1094.09H-392.105V1976.74Z" fill="white"/>
      </mask>
      <g mask="url(#mask0_1072_28330)">
        <path
          d="M327.467 12.1014H350.649C367.752 12.1014 384.769 21.1588 384.769 43.2555C384.769 64.0844 368.089 74.7509 351.494 74.7509H327.467V12.1014ZM341.351 62.4714H350.227C362.165 62.4714 370.121 55.0231 370.121 43.1702C370.121 31.9105 362.079 24.2955 350.564 24.2955H341.351V62.4714Z"
          fill="white"/>
      </g>
      <path
        d="M464.177 74.7629H479.907L454.096 12.1135H439.323L413.264 74.7629H428.567L433.185 62.4021H459.601L464.177 74.7629ZM437.02 51.2704L446.457 26.7697L455.805 51.2704H437.02Z"
        fill="white"/>
      <path d="M76.2574 21.242L57.9217 39.5817L39.582 21.242L57.9217 2.91013L76.2574 21.242Z" fill="white"/>
      <path d="M76.2574 57.9189L57.9217 76.2585L39.582 57.9189L57.9217 39.5793L76.2574 57.9189Z" fill="white"/>
      <path d="M39.5836 21.2436L21.244 39.5833L2.9082 21.2436L21.244 2.90784L39.5836 21.2436Z" fill="white"/>
      <path d="M112.931 21.2436L94.5955 39.5833L76.2559 21.2436L94.5955 2.90784L112.931 21.2436Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_1072_28330">
        <rect width="560" height="79.1663" fill="white"/>
      </clipPath>
    </defs>
  </svg>


)