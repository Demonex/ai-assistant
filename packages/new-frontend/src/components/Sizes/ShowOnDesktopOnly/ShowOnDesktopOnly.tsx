import React, {memo} from "react";
import {useSizes} from "../../../hooks/useSizes.js";

type MobileOnlyProps = {
    children: React.ReactNode
}
export const ShowOnDesktopOnly = memo<MobileOnlyProps>(({
                                                      children
                                                  }) => {
    const {isDesktop} = useSizes();

    if (!isDesktop) {
        return null
    }

    return (
        <>
            {children}
        </>
    )

})
