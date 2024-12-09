import Header from "../../../../components/HeaderMain/index.js";
import Platforms from "../../../WelcomePage/components/Platforms.js";
import ArtistInfo from "../ArtistInfo.js";
import VioletInterraption from "../Fans/components/VioletInterraption.js";
import TrackPosition from "../TrackPosition.js";
import Geography from "../../../WelcomePage/components/Geography.js";
import Tariffes from "../../../WelcomePage/components/Tariffes.js";
import LilacCTACustomers from "../LilacCTACustomers.js";
import FAQ from "../../../WelcomePage/components/FAQ.js";
import Telegram from "../../../WelcomePage/components/Telegram.js";
import BottomDistributors from "../Distributors/components/BottomDistributors.js";
import BottomBeforeFooter from "../../../WelcomePage/components/BottomBeforeFooter.js";
import Footer from "../../../../components/FooterMain/index.js";
import {memo} from "react";
import HeroFans from "./components/HeroFans.js";

const Fans = memo(() => {
    return (
        <>
            <div className='w-full flex flex-col h-[100vh] items-center '>
                <Header/>
                <div className='flex flex-col items-center px-auto max-w-[1920px] w-full bg-[#0C0C0C] z-10'>
                    <HeroFans/>
                    <Platforms/>
                    <ArtistInfo/>
                    <VioletInterraption/>
                    <TrackPosition/>
                    <Geography/>
                    <Tariffes/>
                    <LilacCTACustomers/>
                    <FAQ/>
                    <Telegram/>
                    <BottomDistributors/>
                </div>
                <BottomBeforeFooter tildaColor='#125BFF'/>
                <Footer/>
            </div>
        </>
    )
})
export default Fans