import Header from "../../../../components/HeaderMain/index.js";
import Platforms from "../../../WelcomePage/components/Platforms.js";
import ArtistInfo from "../ArtistInfo.js";
import Tariffes from "../../../WelcomePage/components/Tariffes.js";
import LilacCTA from "../../../WelcomePage/components/LilacCTA.js";
import FAQ from "../../../WelcomePage/components/FAQ.js";
import Telegram from "../../../WelcomePage/components/Telegram.js";
import Bottom from "../../../WelcomePage/components/Bottom.js";
import BottomBeforeFooter from "../../../WelcomePage/components/BottomBeforeFooter.js";
import Footer from "../../../../components/FooterMain/index.js";
import HeroLabels from "./components/HeroLabels.js";
import {memo} from "react";

const Labels = memo(() => {
    return (
        <>
            <div className='w-full flex flex-col h-[100vh] items-center '>
                <Header/>
                <div className='flex flex-col items-center px-auto max-w-[1920px] w-full bg-[#0C0C0C] z-10'>
                    <HeroLabels/>
                    <Platforms/>
                    <ArtistInfo/>
                    <Tariffes/>
                    <LilacCTA/>
                    <FAQ/>
                    <Telegram/>
                    <Bottom/>
                </div>
                <BottomBeforeFooter tildaColor='#125BFF'/>
                <Footer/>
            </div>
        </>
    )
})
export default Labels