import bottomImg from "/assets/png/bottomImgNew.png";
import PrimaryButton from "../../../components/PrimaryButton.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {BigTilda} from "../../../assets/BigTilda.js";
type BottomBeforeFooterProps = {
    children?: React.ReactNode;
    fillPath?: string;
    tildaColor?: string;
}
const BottomBeforeFooter = ({tildaColor, children,fillPath}:BottomBeforeFooterProps) => {
    const {elementRange, isTablet, isMobile} = useSizes();
    const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
    const {elementRange: elementRangeMobile} = useSizes(320, 768);
    const {paddingHorizontal} = useElementRangeSize()
    const hiddenDiv = elementRangeLaptop(600, 850);
    const imageSize = elementRange(550, 1030);
    const tildaSizeMob = elementRangeMobile(800, 1900);
    const hiddenDivMobile = elementRangeMobile(300, 600);
    const topPositionButton = elementRangeLaptop(67, 62);

    return (
        <div className='relative w-full overflow-hidden' style={{
            minHeight: isTablet || isMobile ? `${hiddenDivMobile}px` : `${hiddenDiv}px`,
            paddingLeft: `${paddingHorizontal}px`,
            paddingRight: `${paddingHorizontal}px`
        }}>
            <img src={bottomImg} className='absolute w-full left-1/2 -translate-x-1/2 top-8 z-20'
                 style={{
                     width: `${imageSize}px`,
                 }}/>
            <PrimaryButton
                style={{
                    top: isMobile || isTablet ? '62%' : `${topPositionButton}%`,
                    width: isMobile ? `calc(100% - ${paddingHorizontal}px)` : '723px',
                }}
                className='py-5 md:py-8 px-8 lg:px-[9.75rem] bg-yellow rounded-[12px] md:rounded-[20px] absolute left-1/2 -translate-x-1/2 lg:ml-2.5 z-30'
                title='Попробовать бесплатно'
                to='/auth/sign-up'
                titleClassName='text-[black] text-h3Mobile md:text-h3Desctop whitespace-nowrap '
                isIcon={false}/>
            <BigTilda
                fillPath={fillPath}
                color={tildaColor}
                children={children}
                className='absolute z-10 lg:-bottom-[30%] '
                style={{
                    minWidth: isMobile || isTablet ? `${tildaSizeMob}px` : '',
                    top: isMobile ? "0" : "",
                    left: isMobile ? "-100%" : isTablet ? '-50%' : "0",
                }}
            />
        </div>
    )
}
export default BottomBeforeFooter
