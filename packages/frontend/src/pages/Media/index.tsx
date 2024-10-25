import Header from '../../components/HeaderMain/index.js';
import Tariffes from '../WelcomePage/components/Tariffes.js';
import Telegram from '../WelcomePage/components/Telegram.js';
import Bottom from '../WelcomePage/components/Bottom.js';
import BottomBeforeFooter from '../WelcomePage/components/BottomBeforeFooter.js';
import Footer from '../../components/FooterMain/index.js';
import NewsBlock from './components/NewsBlock/index.js';
import {memo} from 'react';

export const MediaPage = memo(() => {
  return (
    <div className="w-full flex flex-col h-[100vh] items-center ">
      <Header/>
      <div
        style={{
          zIndex: '10'
        }}
        className="mainParent flex flex-col items-center px-auto max-w-[1920px] w-full bg-[#0C0C0C]">
        <NewsBlock/>
        <Telegram/>
        <Tariffes/>
        <Bottom/>
      </div>
      <BottomBeforeFooter tildaColor="#125BFF"/>
      <Footer/>
    </div>
  );
});