import Header from "../../components/HeaderMain/index.js";
import Footer from "../../components/FooterMain/index.js";
import {memo} from "react";
import PrivacyPolicy from "./components/PrivacyPolicy.js";
import UserAgreement from "./components/UserAgreement.js";
import {useParams} from "wouter";
import PublicOffer from "./components/PublicOffer.js";
import Requisite from "./components/Requisite.js";
import BottomBeforeFooter from "../WelcomePage/components/BottomBeforeFooter.js";


export const Documents = memo(() => {
    const params = useParams();
    const document = params['documents-content'];
    const renderDocument = () => {
        switch (document) {
            case 'privacy-policy':
                return <PrivacyPolicy/>
            case 'public-offer':
                return <PublicOffer/>
            case 'user-agreement':
                return <UserAgreement/>
            case 'requisite':
                return <Requisite/>
        }
    }
  return (
    <div className='w-full flex flex-col h-[100vh] items-center '>
      <Header/>
      <div
        className='flex flex-col flex-1 items-center w-full bg-[#0C0C0C] z-10 '>
        <div className='mt-[63px] md:mt-[103px] w-full py-5 md:py-10 lg:py-[4.5rem] px-4 md:px-8 flex flex-col items-center'>
            {
                renderDocument()
            }
        </div>
          {
              document === 'requisite' && (
                  <BottomBeforeFooter fillPath='#2067FF'/>

              )
          }
      </div>
      <Footer/>
    </div>
  )
})