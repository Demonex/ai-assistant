import Input from "./Input.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";
import {useIsSentMessage} from "../hooks/useIsSentMessage.js";

const Form = memo(() => {
    const {isMobile} = useSizes();
    const {setIsSentMessage} = useIsSentMessage();

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl lg:text-[2rem] leading-[150%] font-medium'>Обратная связь</h1>
              <div>
                <p className='text-captionText font-normal text-medium_grey'>Оставь свои контакты и мы скоро
                  свяжемся с тобой</p>
                <p className='text-captionText font-normal text-medium_grey'>Или напиши нам на почту <span className='text-white'>supporrifify@gmail.com.</span></p>
              </div>
            </div>
          <form className='flex flex-col gap-4'>
            <Input
              labelName='Имя'
              type='text'
                    placeholder='Как к тебе обращаться?'/>
                <Input
                    labelName='Email'
                    type='email'
                    placeholder='example@gmail.com'/>
                <Input
                    labelName='Контактный телефон'
                    type='tel'
                    placeholder='+7 (      )'/>
                <Input
                    labelName='Сообщение'
                    type='text'
                    placeholder='Чем мы можем помочь?'
                    style={{
                        paddingBottom: isMobile ? '120px' : '150px'
                    }}/>
                <div className='flex flex-col gap-[0.875rem] md:flex-row mt-1'>
                    <PrimaryButton
                        titleClassName='text-btnText'
                        isIcon={false}
                        title='Отмена'
                        className='py-2.5 md:py-4 px-20 w-full  md:w-[270px]  rounded-xl border border-medium_grey border-solid hover:scale-105 transition duration-300'
                    />
                    <PrimaryButton
                        titleClassName='text-btnText'
                        isIcon={false}
                        title='Отправить'
                        className='py-2.5 md:py-4 px-20 w-full  md:w-[270px] bg-primary_blue  rounded-xl hover:scale-105 transition duration-300'
                        onClick={() => setIsSentMessage(true)}
                    />
                </div>
            </form>
        </div>

    )
})
export default Form