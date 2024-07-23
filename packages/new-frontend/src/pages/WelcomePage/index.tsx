import '../../index_mainPage.css'
import WelcomeScreen from "./components/WelcomeScreen.js";
import Header from "../../components/HeaderMain/index.js";
import {useSizes} from "../../hooks/useSizes.js";
import Platforms from "./components/Platforms.js";
import Start from "./components/Start.js";
import Auditoria from "./components/Auditoria.js";
import VioletCTA from "./components/VioletCTA.js";
import Know from "./components/Know.js";
import Talents from "./components/Talents.js";
import Report from "./components/Report.js";
import {useElementRangeSize} from "../../hooks/useElementRangeSize.js";
import PinkCTA from "./components/PinkCTA.js";
import Socials from "./components/Socials.js";
import Playlists from "./components/Playlists.js";
import Geography from "./components/Geography.js";
import LilacCTA from "./components/LilacCTA.js";
import FAQ from "./components/FAQ.js";
import Telegram from "./components/Telegram.js";
import Bottom from "./components/Bottom.js";
import Footer from "../../components/FooterMain/index.js";
import bottomImgMob from "/assets/png/bottom-mob@3x.png";
import bottomImg from "/assets/png/bottomImg@3x.png";
import Tariffes from "./components/Tariffes.js";


export const WelcomePage = () => {
    const {elementRange, isTablet, isMobile} = useSizes();
    const {elementRange: elementRangeMobile} = useSizes(320, 1023);
    const {paddingHorizontal} = useElementRangeSize()
    // const mainGap = elementRange(30, 60);
    const mainGapMobile = elementRangeMobile(75, 150);
    const {elementRange: elementRangeLaptop} = useSizes(1024, 2560);
    const hiddenDiv = elementRangeLaptop(430, 1100);
    const hiddenDivMobile = elementRangeMobile(350, 1000);
    const topPositionImage = elementRangeLaptop(6, 10);
    const topPositionImageMobile = elementRangeMobile(3, 0);
    return (
        <div className='w-full flex flex-col h-[100vh] items-center '>
            <Header/>
            <div
                style={{
                    // paddingRight: `${paddingHorizontal}px`,
                    // paddingLeft: `${paddingHorizontal}px`,
                    // gap: isTablet || isMobile ? `${mainGapMobile}px` : `${mainGap}px`,
                    zIndex: '10'
                }}
                className='mainParent flex flex-col items-center px-auto max-w-[1920px] w-full bg-[#0C0C0C] '>
                <WelcomeScreen/>
                <Platforms/>
                <Start/>
                <Auditoria/>
                <VioletCTA/>
                <Know/>
                <Talents/>
                <Report/>
                <PinkCTA/>
                <Socials/>
                <Playlists/>
                <Geography/>
                <Tariffes/>
                <LilacCTA/>
                <FAQ/>
                <Telegram/>
                <Bottom/>
            </div>
            <div className='relative w-full' style={{
                minHeight: isTablet || isMobile ? `${hiddenDivMobile}px` : `${hiddenDiv}px`,
            }}>
                <img src={isMobile || isTablet ? bottomImgMob : bottomImg} className='absolute w-full left-0  '
                     style={{
                         top: isMobile || isTablet ? `${topPositionImageMobile}%` : `${topPositionImage}%`,

                     }}/>
            </div>
            <Footer/>


        </div>
    )
}

