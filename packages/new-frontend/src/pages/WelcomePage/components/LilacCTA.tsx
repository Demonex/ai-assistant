import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";
import img from '/assets/png/TryFreeNew.png'
import spray from '/assets/png/prayBlack.png'
import {ShowOnLaptopToDesktop} from "../../../components/SowOnLaptopToDeckTop/index.js";
import {ShowOnMobileToTablet} from "../../../components/showFromMobileToTablet/index.js";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";

const LilacCTA = memo(() => {
  const {elementRange, isMobile, isTablet} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
  const {h1SizeMobile, h1Size, paddingHorizontal, marginVertical} = useElementRangeSize()
  const {elementRange:elementRangeMobile} = useSizes(320, 1024);
  const horizontalPadding = elementRangeLaptop(20, 77);
  const verticalPadding = elementRange(47, 69);
  const imgSize = elementRange(230, 430);
  const imgSizeMob = elementRangeMobile(360, 670);
  // const h1Size = elementRangeLaptop(84/3, 84);
  const sparySize = elementRange(120, 350);
  const sparySizeMobile = elementRangeMobile(120, 350);
  const bottom = elementRangeLaptop(14, 25);
  const bottomMobile = elementRangeMobile(8, 22);

  return (
    <div
        className='w-full'
        style={{
            paddingLeft: `${paddingHorizontal}px`,
            paddingRight: `${paddingHorizontal}px`,
            marginTop:`${marginVertical*2}px`,
            marginBottom:`${marginVertical}px`,
    }}>
      <div
        style={{
          paddingBottom: isMobile || isTablet ? '0px' :`${verticalPadding}px`,
          paddingTop: `${verticalPadding}px`,
          paddingLeft: `${horizontalPadding}px`,
          paddingRight: `${horizontalPadding}px`,
        }}
        className='w-full animated-gradient flex items-center justify-start relative rounded-[20px]'>
        <div className='w-full lg:w-[60%] flex flex-col items-center gap-8 lg:block'>
          <div className='w-full 2xl:w-full'>
              <h1 className=' text-h2Desctop font-bold lg:font-black text-center lg:text-start'
                  style={{
                      fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                  }}>
                  Используй ценные данные{isMobile || isTablet ? null : <br/>} и принимай решения, которые
                  <span className='z-20 text-h2Desctop font-bold lg:font-black relative w-fit'
                        style={{
                            fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                        }}>
               &nbsp;выстрелят
              <img
                  className='absolute -z-10 -top-[20%] right-0'
                  style={{
                      fontSize: isMobile || isTablet ? `${sparySizeMobile}px` : `${sparySize}px`,
                  }}
                  src={spray}/>
            </span>
              </h1>

          </div>
            <ShowOnMobileToTablet>
                <img
                    src={img}
                    className=''
                    style={{
                        width: `${imgSizeMob}px`,
                    }}
                />
            </ShowOnMobileToTablet>
        </div>
          <ShowOnLaptopToDesktop>
              <img
                  src={img}
                  className='absolute -right-[20px] bottom-0 '
                  style={{
                      height: `${imgSize}px`,
                  }}
              />
          </ShowOnLaptopToDesktop>

      </div>
    </div>
  )
})
export default LilacCTA;
