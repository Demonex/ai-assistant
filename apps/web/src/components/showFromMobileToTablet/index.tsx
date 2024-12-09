import React, {memo} from "react";
import {useSizes} from "../../hooks/useSizes.js";

type MobileOnlyProps = {
  children: React.ReactNode
}
export const ShowOnMobileToTablet = memo<MobileOnlyProps>(({
                                                             children
                                                           }) => {
  const {isMobile, isTablet} = useSizes();

  if (!isMobile && !isTablet) {
    return null
  }

  return (
    <>
      {children}
    </>
  )

})
