import React from "react";
import FullWidthImage from "react-native-fullwidth-image";
import { Dimensions, Image as ImageComponent, View } from "react-native";

import { Props } from "../types";

 const Image: React.FC<Props> = props => {
  const {
    className: imgClassName,
    sizes: sizesFromProps,
    resource,
    src: srcFromProps,
    width: widthFromProps,
    height: heightFromProps
  } = props;

  const window = Dimensions.get("window");
  let width: number | undefined = widthFromProps;
  let height: number | undefined = heightFromProps;
  let src: any | string | undefined = srcFromProps;

  if (!src && resource && typeof resource !== "string") {
    width = resource.width;
    height = resource.height;
    src = `https://backend.zenflowapp.com/media/${resource.filename}`;
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes

  return (
    <FullWidthImage
      style={{
        borderRadius: 8
      }}
      source={{ uri: src }}
    />
  );
};
export default Image