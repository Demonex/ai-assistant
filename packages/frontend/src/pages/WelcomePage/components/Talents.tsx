import imgTalents from '../../../assets/png/talentsImg.png'
import imgTalentsMob from '../../../assets/png/talents-mob@3x.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";
import {SvgLogo} from "../../../assets/svg/Logo.js";

const Talents = memo(() => {
  const {h1Size, h1SizeMobile} = useElementRangeSize();
  const {elementRange, isMobile, isTablet} = useSizes();
  const {elementRange: elementRangeMobile} = useSizes(320, 768);
  const imgKnowSize = elementRange(280, 1230);
  const buttonTextSize = elementRangeMobile(12, 24);
  const buttonPaddingVertical = elementRangeMobile(10, 28);
  const buttonPaddingHorizontal = elementRangeMobile(12, 48);
  const buttonBorderRadius = elementRangeMobile(10, 18);
  const raitingInfoPaddingHorizontal = elementRangeMobile(16, 32);
  const raitingInfoPaddingVertical = elementRangeMobile(14, 28);
  const raitingPoints = elementRangeMobile(28, 56);
  const textSize = elementRangeMobile(14, 30);
  const logoSize = elementRangeMobile(28, 56);
  const gapRating = elementRangeMobile(14, 28);
  const marginTopRating = elementRangeMobile(40, 100);

  return (
    <div className='flex flex-col lg:flex-row justify-between items-center '>
      <div className='w-full lg:w-2/5'>
        <h1
          style={{
            fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
            lineHeight: '120%'

          }}
          className='font-bold'>Лови новые таланты<br/> и&nbsp;подписывай их&nbsp;на <br/> свой лейбл</h1>
      </div>
      <div className='w-full mt-8'>
        {
          isMobile || isTablet
            ? <>
              <img src={imgTalentsMob} style={{
                maxWidth: ' 107%'
              }}/>
              <div className='flex flex-col' style={{gap: `${gapRating}px`, marginTop:`-${marginTopRating}px`}}>
                <SvgLogo fill='#cccccd' style={{width: `${logoSize}px`}} className='opacity-30'/>
                  <div className='flex items-center justify-between'>
                    <p
                      style={{
                        fontSize: `${textSize}px`
                      }}
                      className='font-bold'
                    >Потенциальная<br/> восходящая звезда!</p>
                    <div
                      style={{
                        paddingTop:`${buttonPaddingVertical}px`,
                        paddingBottom:`${buttonPaddingVertical}px`,
                        paddingRight:`${buttonPaddingHorizontal}px`,
                        paddingLeft:`${buttonPaddingHorizontal}px`,
                        borderRadius: `${buttonBorderRadius}px`

                      }}
                      className=' bg-yellow flex justify-center items-center'
                    >
                      <p
                        style={{
                          fontSize: `${buttonTextSize}px`,
                        }} className='text-[black] font-bold text-2xl leading-0'>Подписаться!</p>
                    </div>
                  </div>
                <div
                  style={{
                    paddingRight: `${raitingInfoPaddingHorizontal}px`,
                    paddingLeft: `${raitingInfoPaddingHorizontal}px`,
                    paddingBottom: `${raitingInfoPaddingVertical}px`,
                    paddingTop: `${raitingInfoPaddingVertical}px`
                  }}
                  className='w-full flex border border-[#cccccd]/30 rounded-[18px]  items-center justify-between'>
                  <p className='text-[#cccccd]/50 font-bold' style={{fontSize:`${buttonTextSize}px`}}>Упоминаний артиста за неделю:</p>
                  <p className='text-yellow font-black' style={{fontSize: `${raitingPoints}px`}}>+1850</p>
                </div>
              </div>
            </>
            : <img src={imgTalents} style={{
              width: `${imgKnowSize}px`
            }}/>
        }
      </div>
    </div>
  )
})
export default Talents
