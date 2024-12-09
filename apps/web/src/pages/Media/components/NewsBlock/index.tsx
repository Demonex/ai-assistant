import React, {memo} from "react";
import {useSizes} from "../../../../hooks/useSizes.js";
import NewsTabs from "./components/NewsTabs.js";
import AccentArticle from "./components/AccentArticle.js";
import NewsList from "./components/NewsList.js";


const NewsBlock = memo(() => {
    const {isMobile} = useSizes();
    const {elementRange:elementRangeLaptop} = useSizes(1024, 1920);
    const paddingHorizontal = elementRangeLaptop(30, 262);
    const paddingHorizontalMobile = elementRangeLaptop(16, 30);
    return (
        <div
            className='w-full flex flex-col'
            style={{
                marginTop: isMobile ? "68px" : "103px",
                // marginBottom: `${marginVertical}px`,
                paddingLeft:isMobile ? `${paddingHorizontalMobile}px` : `${paddingHorizontal}px`,
                paddingRight: isMobile ? `${paddingHorizontalMobile}px` : `${paddingHorizontal}px`,
            }}
        >
            <h1 className='text-h1Mobile md:text-h1Medium lg:text-h1Desctop mt-10'>Медиа</h1>
            <NewsTabs/>
            <AccentArticle/>
            <NewsList/>
        </div>
    )
})
export default NewsBlock;