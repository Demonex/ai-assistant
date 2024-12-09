import React, {memo} from "react";
import {useSizes} from "../../../hooks/useSizes.js";

type MobileOnlyProps = {
    children: React.ReactNode
}
export const ShowOnLaptopToDesktop = memo<MobileOnlyProps>(({
                                                                children
                                                            }) => {
    const {isLaptop,isDesktop} = useSizes();

    if (!isLaptop && !isDesktop) {
        return null
    }

    return (
        <>
            {children}
        </>
    )

})
