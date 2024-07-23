import PrimaryButton from "../../../components/PrimaryButton.js";
import {useSizes} from "../../../hooks/useSizes.js";
import SimpleToggle from "../../../../public/tailwind/components/application-ui/forms/toggles/simple_toggle.jsx";
import icon from '../../../assets/svg/cases.svg'
import CheckboxIcon from "../../../assets/svg/checkbox.js";

const options = [
  {
    title: 'Бесплатный',
    description: 'Всем желающим использовать нейросети',
    gptOption: 'GPT 3.5',
    gptDescription: '10 000 слов/месяц',
    users: '1 пользователь',
    price: '0',
    preferences: [
      {
        icon: '',
        text: 'IMI чат: чат-бот с ИИ'
      },
      {
        icon: '',
        text: '30+ ролей в чате'
      },
      {
        icon: '',
        text: '100+ текстовых шаблонов'
      },
      {
        icon: '',
        text: 'Базовое обучение'
      },
      {
        icon: '',
        text: 'IMI Editor (как Notion AI, но лучше)'
      },
      {
        icon: '',
        text: 'Загрузка PDF-файлов в чат с ИИ'
      },
    ],
    discount: ''
  },
  {
    title: 'Продвинутый',
    description: 'Всем желающим использовать нейросети',
    gptOption: 'GPT 3.5',
    gptDescription: '10 000 слов/месяц',
    users: '1 пользователь',
    price: '1 990',
    preferences: [
      {
        icon: '',
        text: 'IMI чат: чат-бот с ИИ'
      },
      {
        icon: '',
        text: '30+ ролей в чате'
      },
      {
        icon: '',
        text: '100+ текстовых шаблонов'
      },
      {
        icon: '',
        text: 'Базовое обучение'
      },
      {
        icon: '',
        text: 'IMI Editor (как Notion AI, но лучше)'
      },
      {
        icon: '',
        text: 'Загрузка PDF-файлов в чат с ИИ'
      },
    ],
    discount: '20%'

  },
  {
    title: 'PRO / команда',
    description: 'Всем желающим использовать нейросети',
    gptOption: 'GPT 3.5',
    gptDescription: '10 000 слов/месяц',
    users: '1 пользователь',
    price: '13 990',
    preferences: [
      {
        icon: '',
        text: 'IMI чат: чат-бот с ИИ'
      },
      {
        icon: '',
        text: '30+ ролей в чате'
      },
      {
        icon: '',
        text: '100+ текстовых шаблонов'
      },
      {
        icon: '',
        text: 'Базовое обучение'
      },
      {
        icon: '',
        text: 'IMI Editor (как Notion AI, но лучше)'
      },
      {
        icon: '',
        text: 'Загрузка PDF-файлов в чат с ИИ'
      },
    ],
    discount: '33%'

  }
]
const Tariffs = () => {
  const {elementRange} = useSizes();
  const {elementRange: elementRangeTablet} = useSizes(768, 2560);
  const h1Size = elementRange(46, 56);
  const priceSize = elementRange(38, 50);
  const titleTariffesSize = elementRangeTablet(24, 42);
  const buttonPaddingHorizontal = elementRangeTablet(12, 44);
  const buttonPaddingVertical = elementRangeTablet(12, 37);
  const buttonText = elementRangeTablet(16, 24);

  return (
    <div className='w-full flex flex-col'>
      <h1
        className='font-bold'
        style={{
          fontSize: `${h1Size}px`
        }}>Тарифы</h1>
      <div className='w-full flex py-5 justify-end gap-2 items-center'>
        <p className='text-[white]/50 text-[10px] lg:text-xs xl:text-sm'>Ежемесячно</p>
        <>
          <SimpleToggle/>
        </>
        <p className='text-[white]/50 text-[10px] lg:text-xs xl:text-sm'>Ежегодно</p>
        <p className='text-[white] uppercase text-[10px] lg:text-xs xl:text-sm font-bold'>Сэкономьте до 33%</p>
      </div>
      <div className='w-full flex items-center gap-4 xl:gap-8 py-4'>
        {
          options.map((item, i) => (
            <div key={i}
                 className={`w-full p-3 xl:p-6 border  rounded-[20px] flex flex-col gap-4 ${i === 1 ? 'border-[#8b1aea]' : 'border-[#333333]'}`}>
              <div>
                <h2
                  style={{
                    fontSize: `${titleTariffesSize}px`
                  }}
                  className=''>{item.title}</h2>
                <p className='text-[white]/50 text-[14px]'>{item.description}</p>
              </div>
              <div className='py-2 px-3 bg-[white]/5 w-fit rounded-[12px]'>
                <p className='text-[white]/70 text-[14px]'>{item.gptOption}</p>
              </div>
              <div>
                <p className='text-[white]/50 text-[14px]'>{item.gptDescription}</p>
                <p className='text-[white]/50 text-[14px]'>{item.users}</p>
              </div>
              <h1
                style={{
                  fontSize: `${priceSize}px`
                }}
                className='font-bold'>{item.price} руб</h1>
              <PrimaryButton
                icon={icon}
                iconClassName='h-[24px] xl:h-[37px]'
                style={{
                  paddingRight: `${buttonPaddingHorizontal}px`,
                  paddingLeft: `${buttonPaddingHorizontal}px`,
                  paddingBottom: `${buttonPaddingVertical}px`,
                  paddingTop: `${buttonPaddingVertical}px`
                }}
                className={`w-full ${i === 1 ? 'bg-[#8b1aea]' : 'bg-[#105cfb]'} rounded-[8px] xl:rounded-[20px] flex justify-center items-center gap-2 xl:gap-4`}
                title='Попробовать бесплатно'
                titleStyle={{
                  fontSize: `${buttonText}px`
                }}
                titleClassName='whitespace-nowrap font-bold'
                isIcon={true}/>
              <div className='py-4 flex flex-col gap-3'>
                {
                  item.preferences.map((pref, iPref) => (
                    <div key={iPref} className='flex items-center gap-2'>
                      <CheckboxIcon
                        style={{
                          height: '32px',
                        }}
                        stylePath={{
                          fill: i === 1 ? '#643aba' : '#1a61ef',

                        }}/>
                      <p className='text-[white]/50'>{pref.text}</p>
                      <img src=''/>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default Tariffs
