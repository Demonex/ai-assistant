import {useSizes} from "../../../hooks/useSizes.js";
import {Disclosure, Transition,} from '@headlessui/react'
import {memo, useEffect, useState} from "react";
import tape from '../../../assets/png/Tape@3x.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {ShowOnLaptopToDesktop} from "../../../components/SowOnLaptopToDeckTop/index.js";
const questions = [
  {
    title: 'Что такое Rifify?',
    description: 'Rifify — это платформа, основанная на данных, которая предоставляет музыкантам и профессионалам музыкальной индустрии информацию и аналитику, необходимые для принятия обоснованных решений и достижения успеха'
  },
  {
    title: 'Чем сервис может помочь музыкантам?',
    description: 'Rifify — это платформа, основанная на данных, которая предоставляет музыкантам и профессионалам музыкальной индустрии информацию и аналитику, необходимые для принятия обоснованных решений и достижения успеха'
  },
  {
    title: 'Какие данные использует сервис?',
    description: 'Rifify — это платформа, основанная на данных, которая предоставляет музыкантам и профессионалам музыкальной индустрии информацию и аналитику, необходимые для принятия обоснованных решений и достижения успеха'
  },
  {
    title: 'Сколько стоит использование?',
    description: 'Rifify — это платформа, основанная на данных, которая предоставляет музыкантам и профессионалам музыкальной индустрии информацию и аналитику, необходимые для принятия обоснованных решений и достижения успеха'
  },
  {
    title: 'Могу ли я попробовать сервис бесплатно?',
    description: 'Rifify — это платформа, основанная на данных, которая предоставляет музыкантам и профессионалам музыкальной индустрии информацию и аналитику, необходимые для принятия обоснованных решений и достижения успеха'
  },
]
const FAQ = memo(() => {
  const {elementRange, isTablet, isMobile} = useSizes();
  const {elementRange:elementRangeLaptop} = useSizes(1024, 2560);
  const {elementRange:elementRangeMobile} = useSizes(320, 1024);
  const {h1Size, h1SizeMobile, borderRadiusMobile} = useElementRangeSize()
  const mainGap = elementRange(33, 66);
  const titleSize = elementRange(32, 64);
  const titleSizeMobile = elementRangeMobile(25, 50);
  const plusSize = elementRangeLaptop(21, 40);
  const descriptionSize = elementRange(16, 36);
  const gapBetweenQuestions = elementRangeLaptop(25, 48);
  const gapBetweenQuestionsMobile = elementRangeMobile(13, 25);
  const questionsHorizontalPadding = elementRangeLaptop(0, 316);
  const tapeSize = elementRangeLaptop(120, 253);
  const buttonPaddingHorizontal = elementRange(95/3, 95);
  const buttonPaddingVertical = elementRangeLaptop(27, 95);
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState()
  const handleClick = (index) => {
    console.log('index', index)
    console.log('activeIndex', activeIndex)
    setOpen(!open);
    setActiveIndex(activeIndex === index ? undefined : index)
  }


  return (
    <div
      style={{
        gap: `${mainGap}px`
      }}
      className='flex flex-col '>
      <h1
        style={{
          fontSize:  isTablet|| isMobile ?`${h1SizeMobile}px` : `${h1Size}px`,
          lineHeight: '120%'
        }}
        className='font-bold text-left w-full'>Вопросы и ответы</h1>
      <div style={{
        paddingLeft: `${questionsHorizontalPadding}px`,
        paddingRight: `${questionsHorizontalPadding}px`,
        gap: isMobile || isTablet ? `${gapBetweenQuestionsMobile}px` : `${gapBetweenQuestions}px`
      }}
           className='w-full flex flex-col '>
        {
          questions.map((item, index) => (
            <Disclosure key={index}>
              <Disclosure.Button
                className={`gap-[32px] lg:gap-[64px] bg-[#17191d]  flex flex-col items-center justify-start ${index === 0 ? 'relative' : ''}`}
                style={{
                  paddingTop: `${buttonPaddingVertical}px`,
                  paddingBottom: `${buttonPaddingVertical}px`,
                  paddingLeft: `${buttonPaddingHorizontal}px`,
                  paddingRight: `${buttonPaddingHorizontal}px`,
                  borderRadius: `${borderRadiusMobile}px`
                }}
                onClick={() => handleClick(index)} >
                <ShowOnLaptopToDesktop>
                  {
                    index === 0 && (
                      <img src={tape} className='absolute right-[10%] -top-[25%]' style={{width:`${tapeSize}px`}}/>
                    )
                  }
                </ShowOnLaptopToDesktop>
                <div className='w-full flex flex-col-reverse lg:flex-row items-center justify-between lg:gap-6 relative'>
                  <p className='font-bold w-full text-left'
                     style={{
                       fontSize:isTablet || isMobile? `${titleSizeMobile}px` :`${titleSize}px`,
                        lineHeight: '120%'
                  }}>{item.title}</p>
                  <p className='text-[#e4fd44] font-medium  text-right absolute -top-[15%] -right-[5%] lg:relative'
                     style={{
                       fontSize:`${plusSize}px`}}>{open && activeIndex === index ? '–' : '+'
                  }</p>
                </div>

                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel>
                    <p className='text-[white]/70 text-left'
                       style={{
                         fontSize:`${descriptionSize}px`,
                          lineHeight: '120%'
                    }}>{item.description}</p>
                  </Disclosure.Panel>
                </Transition>
              </Disclosure.Button>
            </Disclosure>
          ))
        }
      </div>
    </div>
  )
})
export default FAQ
