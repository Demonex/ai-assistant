import {memo} from "react";
import LogoNew from "../../assets/LogoNew.js";
import RRR from "/assets/svg/RRRRR.svg";
import {useElementRangeSize} from "../../hooks/useElementRangeSize.js";
import {useSizes} from "../../hooks/useSizes.js";
import {Link, useParams} from "wouter";
import {SignInPage} from "./components/SignIn/SignInPage.js";
import {SignUpPage} from "./components/SignUp/SignUpPage.js";
import {PasswordRecovery} from "./components/PasswordRecovery/index.js";
import {NewPassword} from "./components/NewPassword/index.js";

export const FormPage = memo(() => {
    const {paddingHorizontal} = useElementRangeSize();
    const {isMobile} = useSizes();
    const param = useParams();
    const paramName = param['form-content']
    const renderContent = () => {
        switch (paramName) {
            case 'sign-in' :
                return <SignInPage/>
            case 'sign-up' :
                return <SignUpPage/>
            case 'password-recovery' :
                return <PasswordRecovery/>
            case 'new-password' :
                return <NewPassword/>
        }
    }
    return (
        <div className='flex flex-row-reverse relative'>
            <section
                style={{
                    paddingRight: `${paddingHorizontal}px`,
                    paddingLeft: `${paddingHorizontal}px`,
                }}
                className={`w-full h-full z-30 mt-4 md:mt-10 lg:mt-[3.75rem] flex justify-center`}
            >
                <div className="flex flex-col gap-4 md:gap-9 items-center w-full md:w-[35rem]">
                    <div className='w-full'>
                        <Link to='/'>
                            <LogoNew width={isMobile ? 85 : 105}/>
                        </Link>
                    </div>
                    {
                        renderContent()
                    }
                </div>
            </section>
            <div className='w-full h-full absolute hidden md:block'>
                <img src={RRR} className=''/>
            </div>
        </div>
    )
})
