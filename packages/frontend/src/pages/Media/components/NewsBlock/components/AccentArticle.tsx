import {memo} from 'react';
import img from '/assets/png/main_newsImg.png';
import {useElementRangeSize} from '../../../../../hooks/useElementRangeSize.js';
import {useSizes} from '../../../../../hooks/useSizes.js';
import {Link} from 'wouter';
import {DateTime} from 'luxon';
import {useNews} from '../../../hooks/useNews.js';

const news = {
  type: 'Статьи',
  color: '#1FD660',
  title: 'Как снимали клип Daft Punk — Around the World',
  subtitle: 'Режиссер Мишель Гондри рассказывает о том, почему видео получилось таким, что значат все эти персонажи, кто ставил танцы и рочие секреты съемочной площадки',
  date: 'Сегодня в 21:23',
  img: img
};
const AccentArticle = memo(() => {
  const {isMobile, isTablet} = useSizes();
  const {elementRange: elementRangeMobile} = useSizes(320, 1024);
  const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
  const imageSizeMobile = elementRangeMobile(174, 402);
  const imageSize = elementRangeLaptop(402, 680);
  const {h1Size, h1SizeMobile} = useElementRangeSize();
  const {news: {docs = []} = {}} = useNews();
  const [post] = docs;
  return (
    <div className="py-5">
      <div className="bg-popup_gray hover:bg-secondary_dark_gray rounded-2xl p-5 lg:p-8">
        <div
          className="w-full flex flex-col-reverse lg:flex-row lg:justify-between gap-10 lg:gap-[5.6rem] cursor-pointer">
          <Link to={`media/${post?.id}`}>
            <div className="w-full flex flex-col justify-between gap-4 lg:gap-[3.5rem]">
              <div className="flex flex-col gap-4">
                <div style={{
                  backgroundColor: news.color
                }}
                     className={`py-1 px-2.5 rounded-md text-[black] w-fit`}>
                  <span>{news.type}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 style={{
                    fontSize: isMobile ? `${h1SizeMobile}px` : `${h1Size}px`
                  }}
                      className="text-h2Mobile md:text-h2Medium lg:text-h2Desctop line-clamp-2 lg:line-clamp-3">{post?.title}</h1>
                  <p className="text-t2Regular line-clamp-2 lg:line-clamp-3">{post?.description}</p>
                </div>
              </div>
              <div className="">
                <span
                  className="text-captionText text-medium_grey font-normal">{post?.createdAt && DateTime.fromISO(post.createdAt).toFormat('d MMM yyyy')}</span>
              </div>
            </div>
          </Link>
          <div style={{
            minWidth: isTablet || isMobile ? '' : `${imageSize}px`
          }}
               className="w-full">
            <div className="w-full h-full bg-cover bg-no-repeat bg-center rounded-[16px]"
                 style={{
                   backgroundImage: `url(${post?.preview?.url})`,
                   minHeight: isMobile || isTablet ? `${imageSizeMobile}px` : ``
                 }}/>
          </div>
        </div>
      </div>
    </div>
  );
});
export default AccentArticle;