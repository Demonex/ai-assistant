import {memo, useEffect, useRef, useState} from 'react';
import img from '/assets/png/main_newsImg.png';
import mediaContentVideo from '/assets/video/4178359-hd_1906_1080_25fps.mp4';
import mediaContentPicture from '/assets/jpg/media_content_pic.jpg';
import {MediaType} from '../../../components/MediaType.js';
import {useElementRangeSize} from '../../../hooks/useElementRangeSize.js';
import {useSizes} from '../../../hooks/useSizes.js';
import {useParams} from 'wouter';
import {useNews} from '../../Media/hooks/useNews.js';
import {DateTime} from 'luxon';

const content = {
  type: 'Статьи',
  color: '#1FD660',
  date: 'Сегодня в 21:23',
  title: 'Как снимали клип Daft Punk — Around the World',
  cover: img,
  content: [
    {
      subtitle: 'Режиссер Мишель Гондри рассказывает о том, почему видео получилось таким, что значат все эти персонажи, кто ставил танцы и прочие секреты съемочной площадки',
      text: 'В YouTube-канале Daft Punk появилась пара видео о создании классического клипа дуэта «Around The World».\n' +
        'Выпущенный в 1997 году трек, клип к которому снял французский режиссер Мишель Гондри, сейчас набрал около 19 миллионов просмотров на YouTube. Первоначально видео появилось только на DVD, выпущенном в том же году.\n' +
        'В двух роликах Daft Punk показывают фрагмент оригинальной раскадровки, использованной для создания, а также процесс съемок красочного музыкального видео, в котором танцоры бегают вверх и вниз по лестнице, одетые в блестящие костюмы.',
      mediaContent: ''
    },
    {
      subtitle: 'Подзаголовок',
      text: 'В YouTube-канале Daft Punk появилась пара видео о создании классического клипа дуэта «Around The World».\n' +
        'Выпущенный в 1997 году трек, клип к которому снял французский режиссер Мишель Гондри, сейчас набрал около 19 миллионов просмотров на YouTube. Первоначально видео появилось только на DVD, выпущенном в том же году.\n' +
        'В двух роликах Daft Punk показывают фрагмент оригинальной раскадровки, использованной для создания, а также процесс съемок красочного музыкального видео, в котором танцоры бегают вверх и вниз по лестнице, одетые в блестящие костюмы.',
      mediaContent: mediaContentVideo
    },
    {
      subtitle: 'Подзаголовок',
      text: 'В YouTube-канале Daft Punk появилась пара видео о создании классического клипа дуэта «Around The World».\n' +
        'Выпущенный в 1997 году трек, клип к которому снял французский режиссер Мишель Гондри, сейчас набрал около 19 миллионов просмотров на YouTube. Первоначально видео появилось только на DVD, выпущенном в том же году.\n' +
        'В двух роликах Daft Punk показывают фрагмент оригинальной раскадровки, использованной для создания, а также процесс съемок красочного музыкального видео, в котором танцоры бегают вверх и вниз по лестнице, одетые в блестящие костюмы.',
      mediaContent: mediaContentPicture
    }
  ]
};
const Article = memo(() => {
  const {h1Size, h1SizeMobile} = useElementRangeSize();
  const {isMobile} = useSizes();
  const imageExtensions = ['.gif', '.jpg', '.jpeg', '.png'];
  const videoExtensions = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4'];
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const {"media-content": id} = useParams<{ 'media-content': string }>();
  const {setPost, post, loading} = useNews();
  useEffect(() => {
    setPost(id);
  }, [id]);

  /* useEffect(() => {
     if(isPlaying) {
       videoRef?.current.play();
     }
     videoRef?.current.pause();
   }, [isPlaying]);*/
  return (!post || loading) ? null : (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 ">
        <MediaType type="Статьи" color="#1FD660"/>
        <h1 className="text-h2Mobile md:text-h2Medium lg:text-h2Desctop"
            style={{
              fontSize: isMobile ? `${h1SizeMobile}px` : `${h1Size}px`
            }}>{post?.title}</h1>
        <span
          className="text-captionText font-normal text-medium_grey mt-1">{post?.createdAt && DateTime.fromISO(post.createdAt).toFormat('d MMM yyyy')}</span>
      </div>
      <div>
        <img className="rounded-2xl"
             src={post?.preview?.url}
        />
        <div className="flex flex-col gap-8 mt-8" dangerouslySetInnerHTML={{__html: post?.content?.join('')}}>
          {

            /*content.content.map((item, index) => {
              // const fileExtension = item.mediaContent.split('.').pop();
              return (

                /!*<div key={index} className="flex flex-col gap-4">
                  <h2
                    className={`${index === 0 ? 'text-t1Regular' : 'text-[2rem] font-medium leading-[110%]'}`}>{item.subtitle}</h2>
                  <p className="text-t2Regular text-light_grey mb-4">{item.text}</p>
                  {
                    item.mediaContent
                      ? imageExtensions.map((elem, mediaIndex) => (
                          elem.includes(fileExtension) && (
                            <img src={item.mediaContent} className="rounded-2xl" key={mediaIndex}/>
                          )
                        )
                      )
                      : null
                  }
                  {/!*{item.mediaContent
                    ? videoExtensions.map((elem, mediaIndex) => (
                        elem.includes(fileExtension) && (
                          <div className="relative" key={mediaIndex}>
                            <video muted className="rounded-2xl" src={item.mediaContent}
                                   ref={videoRef}/>
                            <div
                              className={`w-full h-full absolute top-0 left-0 bg-[black]/40 ${isPlaying ? 'opacity-0 transition duration-200' : ''}`}/>
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className={`absolute z-20 top-0 bottom-0 left-0 right-0 cursor-pointer ${isPlaying ? 'opacity-0 transition duration-200' : ''}`}>
                              <img src={playIcon}/>
                            </button>
                          </div>
                        )
                      )
                    )
                    : null
                  }*!/}
                </div>*!/
              );
            })*/
          }
        </div>

      </div>
    </div>
  );
});
export default Article;