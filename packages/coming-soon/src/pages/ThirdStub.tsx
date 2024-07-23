import logo from "../assets/svg/Logo.svg";
import img from "../assets/png/stub3Img.png";
import {convertRange} from "../utils.js";
import {useSizes} from "../hooks/useSizes.js";


const ThirdStubPage = () => {
  const {widthRange} = useSizes()
  const logoWidth = convertRange(widthRange, [1024, 1920], [76, 152]);
  const imgWidth = convertRange(widthRange, [1024, 1920], [406, 812]);
  const minWidthTextContainer = convertRange(widthRange, [1024, 1920], [406, 920]);

  return (
    <>
      <div className="flex justify-center w-full h-full">
        <div className="w-full h-full mx-auto flex flex-col max-w-[1920px] ">
          <div className='px-[150px] py-[50px] '>
            <img src={logo} style={{ width: `${logoWidth}px`}} />
          </div>
          <div className="w-full h-full  flex pl-[150px] items-center gap-[80px]">
            <div style={{
              minWidth: `${minWidthTextContainer}px`
            }}>
              <h1 className='text-[54px] font-bold leading-[60px]'>Стань одним из первых
                пользователей сервиса аналитики</h1>
              <h1 className='text-[54px] font-bold leading-[60px] text-[white]/40'>для музыкантов, менеджеров
                и музыкальных лейблов</h1>
            </div>
            <div className='w-full h-full'>
              <img src={img} style={{width: `${imgWidth}px`}}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ThirdStubPage
