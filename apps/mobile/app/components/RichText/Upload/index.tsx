import Link, {  LinkTypeProps } from "../../Link";
import  Media  from "../../Media";
import { Fragment } from "react";

export interface MediaType {
  id: string;
  alt: string;
  darkModeFallback?: string | typeof Media;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}

export type Props = {
  node: any
  className?: string
}

 const RichTextUpload = (props: Props) => {
  const {
    node: { fields, value },
    className
  } = props;

  let Wrap: typeof Link | typeof Fragment = Fragment;

  let wrapProps: LinkTypeProps = {};

  if (fields?.enableLink) {
    Wrap = Link;
    wrapProps = {
      ...fields?.link
    };
  }

  return (
    // <Wrap {...wrapProps}>
    <Media resource={value as MediaType} />
    // </Wrap>
  );
};

export default RichTextUpload;
