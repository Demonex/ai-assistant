import {useSizes} from "../../../hooks/useSizes.js";
import {Disclosure,} from '@headlessui/react'
import {memo} from "react";
import tape from '/assets/png/Tape@3x.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {ShowOnLaptopToDesktop} from "../../../components/SowOnLaptopToDeckTop/index.js";

const questions = [
  {
    title: 'Что такое Rifify?',
    description: 'Rifify — это платформа, которая предоставляет музыкантам и профессионалам музыкальной индустрии информацию и аналитику, необходимые для принятия обоснованных решений и достижения успеха'
  },
  {
    title: 'Чем сервис может помочь музыкантам?',
      description: <p>Находить свою целевую аудиторию и понимать ее предпочтения <br/>
        Отслеживать эффективность своих релизов и выступлений<br/>
          Идентифицировать возможности для роста и продвижения<br/>
        Связываться с другими профессионалами индустрии<br/>
        Получать ценные сведения о музыкальном рынке и тенденциях</p>
  },
  {
    title: 'Какие данные использует сервис?',
    description: 'Rifify собирает данные из различных источников, включая все известные стриминговые платформы, социальные сети. Более 14 источников данных'
  },
  {
    title: 'Сколько стоит использование?',
    description: 'Сервис предлагает различные тарифные планы, включая бесплатный. Вы можете выбрать план, который наилучшим образом соответствует вашим потребностям и бюджету. Информацию о тарифах можно найти  [здесь]'
  },
  {
    title: 'Могу ли я попробовать сервис бесплатно?',
    description: 'Да, мы предлагаем бесплатный пробный период, чтобы вы могли ознакомиться с функциями платформы перед подпиской на платный тариф'
  },
  {
    title: 'Как мне связаться со службой поддержки Rifify?',
    description: 'Вы можете связаться с нашей службой поддержки по электронной почте [адрес электронной почты]'
  },
  {
    title: 'Где я могу узнать больше о сервисе?',
    description: 'Вы можете узнать больше о нас на нашей странице медиа (ссылка), где мы публикуем новости, статьи и советы для музыкантов и профессионалов индустрии'
  },
]
const FAQ = memo(() => {
  const { isTablet, isMobile} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 2560);
  const {elementRange: elementRangeMobile} = useSizes(320, 1024);
  const {h1Size, h1SizeMobile, marginVertical, paddingHorizontal} = useElementRangeSize()
  const gapBetweenQuestions = elementRangeLaptop(25, 48);
  const gapBetweenQuestionsMobile = elementRangeMobile(13, 25);
  const questionsHorizontalPadding = elementRangeLaptop(0, 162);
  const tapeSize = elementRangeLaptop(110, 200);

  return (
    <div
      style={{
        marginTop:`${marginVertical}px`,
        marginBottom:`${marginVertical}px`,
        paddingRight:`${paddingHorizontal}px`,
        paddingLeft:`${paddingHorizontal}px`,
      }}
      className='w-full flex flex-col gap-10'>
      <h1
        style={{
          fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
          paddingLeft: `${questionsHorizontalPadding}px`,
          paddingRight: `${questionsHorizontalPadding}px`,
        }}
        className='text-h2Desctop font-bold lg:font-black text-left w-full'>Вопросы и ответы</h1>
      <div style={{
        paddingLeft: `${questionsHorizontalPadding}px`,
        paddingRight: `${questionsHorizontalPadding}px`,
        gap: isMobile || isTablet ? `${gapBetweenQuestionsMobile}px` : `${gapBetweenQuestions}px`
      }}
           className='w-full flex flex-col '>
        {
          questions.map((item, index) => (
            <Disclosure key={index} >
              {({open}) => (
                <Disclosure.Button
                  className={`group w-full gap-4 md:gap-8 bg-dark_grey  flex flex-col items-center justify-start py-4 md:py-10 px-5 md:px-12 lg:px-[3.75rem] rounded-[12px] md:rounded-[20px] ${index === 0 ? 'relative' : ''}`}
                >
                  <ShowOnLaptopToDesktop>
                    {
                      index === 0 && (
                        <img src={tape} className='absolute right-[100px] -top-[25px]' style={{width: `${tapeSize}px`}}/>
                      )
                    }
                  </ShowOnLaptopToDesktop>
                  <div
                    className='w-full flex  items-center justify-between lg:gap-6 relative'>
                    <p className='text-h3Mobile md:text-h3Desctop w-full text-left'
                      >{item.title}</p>
                    <div className={`plusminus_animation w-8 h-8 md:w-[60px] md:h-[60px] ${open ? 'active' : ''}`}/>
                  </div>
                  <Disclosure.Panel className='w-full'>
                    <p className='text-[white] text-left text-t1Mobile md:text-t1Regular'
                      >{item.description}</p>
                  </Disclosure.Panel>
                </Disclosure.Button>
              )}
            </Disclosure>
          ))
        }
      </div>
    </div>
  )
})
export default FAQ
