import ChevronRight from "../../../assets/ChevronRight.js";
import React, {memo} from "react";

const PathToArticle = memo(() => {
    return (
        <div className='w-full py-10 flex items-center gap-3 justify-start flex-wrap'>
            <p className='text-captionText '>Главная</p>
            <ChevronRight className='fill-medium_grey'/>
            <p className='text-captionText '>Медиа</p>
            <ChevronRight className='fill-medium_grey'/>
            <p className='text-captionText text-medium_grey'>Как снимали клип Daft Punk — Around the World</p>
        </div>
    )
})
export default PathToArticle;