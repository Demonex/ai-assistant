import spray from '/assets/png/lilac-spray@3x.png'
import {memo} from "react";
import {useElementRangeSize} from "../../../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../../../hooks/useSizes.js";


const BottomManagers = memo(() => {
    const {h1Size,marginVertical, paddingHorizontal, h1SizeMobile} = useElementRangeSize();
    const { isTablet, isMobile} = useSizes();

    return (
        <div  style={{
            marginTop: `${marginVertical}px`,
            paddingLeft: `${paddingHorizontal}px`,
            paddingRight: `${paddingHorizontal}px`,
        }}>
            <div className='w-full flex flex-col ' >
                <div className='flex justify-center gap-2 flex-wrap'>
                    <h1
                        className='text-center text-h2Mobile md:text-h2Desctop relative'
                        style={{
                            fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
                        }}
                    >Выведи своих артистов<br/> на
                        <span className='relative'>
                  &nbsp;новый &nbsp;
                            <img
                                src={spray}
                                className='absolute -z-10 left-0 top-0'/>
              </span>
                        уровень!
                    </h1>
                </div>
            </div>
        </div>

    )
})
export default BottomManagers
