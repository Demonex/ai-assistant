import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";
import img from '../../../assets/png/TryFree.png'
import spray from '../../../assets/png/prayBlack.png'
import {ShowOnLaptopToDesktop} from "../../../components/SowOnLaptopToDeckTop/index.js";
import {ShowOnMobileToTablet} from "../../../components/showFromMobileToTablet/index.js";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";

const LilacCTA = memo(() => {
  const {elementRange, isMobile, isTablet} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 2560);
  const {h1SizeMobile, borderRadiusMobile} = useElementRangeSize()
  const {elementRange:elementRangeMobile} = useSizes(320, 1024);
  const horizontalPadding = elementRange(10, 97);
  const verticalPadding = elementRange(28, 95);
  const imgSize = elementRange(320, 953);
  const h1Size = elementRangeLaptop(84/3, 84);
  const sparySize = elementRange(120, 350);
  const sparySizeMobile = elementRangeMobile(120, 350);
  const bottom = elementRangeLaptop(14, 25);
  const bottomMobile = elementRangeMobile(8, 22);
  const marginTop = elementRange(30, 62);

  return (
    <>
      <div
        style={{
          paddingBottom: isMobile || isTablet ? '0px' :`${verticalPadding}px`,
          paddingTop: `${verticalPadding}px`,
          paddingLeft: `${horizontalPadding}px`,
          paddingRight: `${horizontalPadding}px`,
          marginTop:`${marginTop}px`,
          borderRadius: `${borderRadiusMobile}px`
        }}
        className='w-full bg-[#8b1aea]  flex items-center justify-start relative'>
        <div className='w-full lg:w-2/3 flex flex-col gap-8 lg:block'>
          <div>
            <h1 className=' font-bold'
                style={{
                  fontSize:  isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px` ,
                  lineHeight: '120%'
                }}>
              Используй ценные данные{isMobile || isTablet ? null : <br/>} и принимай решения, которые
            </h1>
            <h1 className='z-20 font-bold relative w-fit'
                style={{
                  fontSize:  isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px` ,
                  lineHeight: '120%'
                }}>
               выстрелят
              <img
                className='absolute -z-10 -top-[20%] right-0'
                style={{
                  fontSize:  isMobile || isTablet ? `${sparySizeMobile}px` : `${sparySize}px` ,
                }}
                src={spray}/>
            </h1>
          </div>
          <ShowOnMobileToTablet>
            <img
              src={img}
              className=''
              style={{
                marginBottom: `-${bottomMobile}px `
              }}
            />
          </ShowOnMobileToTablet>
        </div>
        <ShowOnLaptopToDesktop>
          <img
            src={img}
            className='absolute -right-[20px] 4xl:right-0'
            style={{
              width: `${imgSize}px`,
              bottom: `-${bottom}px `
            }}
          />
        </ShowOnLaptopToDesktop>

      </div>
    </>
  )
})
export default LilacCTA;
