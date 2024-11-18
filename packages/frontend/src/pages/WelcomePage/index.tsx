// import '../../index_mainPage.css'
import WelcomeScreen from "./components/WelcomeScreen.js";
import Header from "../../components/HeaderMain/index.js";
import Platforms from "./components/Platforms.js";
import Start from "./components/Start.js";
import Auditoria from "./components/Auditoria.js";
import VioletCTA from "./components/VioletCTA.js";
import Know from "./components/Know.js";
import Talents from "./components/Talents.js";
import Report from "./components/Report.js";
import PinkCTA from "./components/PinkCTA.js";
import Socials from "./components/Socials.js";
import Playlists from "./components/Playlists.js";
import Geography from "./components/Geography.js";
import LilacCTA from "./components/LilacCTA.js";
import FAQ from "./components/FAQ.js";
import Telegram from "./components/Telegram.js";
import Bottom from "./components/Bottom.js";
import Footer from "../../components/FooterMain/index.js";
import Tariffes from "./components/Tariffes.js";
import BottomBeforeFooter from "./components/BottomBeforeFooter.js";
import upButton from '/assets/svg/UpButton.svg'
import {useEffect, useState} from "react";
import Cookie from "./components/Cookie/index.js";
import SubscriptionBlock from "./components/Tariffes.js";

export const WelcomePage = () => {
    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.getElementById('app').scrollTop;
        if (scrolled > 100){
            setVisible(true)
        }
        else if (scrolled <= 100){
            setVisible(false)
        }
    };
    const scrollToTop = () =>{
        document.getElementById('app').scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    useEffect(() => {
        document.getElementById('app').addEventListener('scroll', toggleVisible);
        return () => {
            document.getElementById('app').removeEventListener('scroll', toggleVisible);
        }
    }, []);
    return (
        <div className='w-full flex flex-col h-[100vh] items-center relative'>
            <button
                onClick={scrollToTop}
                style={{display: visible ? 'inline' : 'none'}}
                className='fixed bottom-[10%] right-4 z-50 cursor-pointer'>
                <img
                    className=' w-[3.75rem] h-[3.75rem] md:w-[5rem] md:h-[5rem]  back_to_top_button'
                    src={upButton}
                />
            </button>
            <Header/>

            <div
                style={{
                    zIndex: '10'
                }}
                className='mainParent flex flex-col items-center px-auto max-w-[1920px] w-full bg-[#0C0C0C]'>
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
                <SubscriptionBlock/>
                <LilacCTA/>
                <FAQ/>
                <Telegram/>
                <Bottom/>
            </div>
            <BottomBeforeFooter tildaColor='#125BFF'/>
            <Footer/>
        </div>
    )
}

