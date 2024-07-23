import WelcomeScreen from "./components/WelcomeScreen.js";
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
import Header from "../../components/HeaderMain/index.js";

const WelcomePage = () => {
  const {elementRange, isTablet, isMobile} = useSizes();
  const {elementRange:elementRangeMobile} = useSizes();
  const {paddingHorizontal} = useElementRangeSize()
  const mainGap = elementRange(150, 200);
  const mainGapMobile = elementRangeMobile(75, 150);

  return (
    <div className='w-full flex flex-col h-[100vh] items-center'>
      <Header/>
      <div
        style={{
          paddingRight: `${paddingHorizontal}px`,
          paddingLeft: `${paddingHorizontal}px`,
          gap: isTablet || isMobile ? `${mainGapMobile}px` :`${mainGap}px`,
        }}
        className='mainParent flex flex-col items-center px-auto max-w-[2560px] w-full'>
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
        <LilacCTA/>
        <FAQ/>
        {/*<Tariffs/>*/}
        <Telegram/>
        <Bottom/>
      </div>
      <Footer/>
    </div>
  )
}
export default WelcomePage
