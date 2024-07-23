import React, {memo} from "react";
import {useSizes} from "../../hooks/useSizes.js";

type MobileOnlyProps = {
  children: React.ReactNode
}
export const ShowFromTabletToDecktop = memo<MobileOnlyProps>(({
                                                             children
                                                           }) => {
  const {isMobile} = useSizes();

  if (isMobile) {
    return null
  }

  return (
    <>
      {children}
    </>
  )

})
