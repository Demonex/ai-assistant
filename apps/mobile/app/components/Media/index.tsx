import Image  from "./Image";
import { Props } from "./types";

 const Media = (props: Props) => {
  const { resource } = props;

  const isVideo = typeof resource !== "string" && resource?.mimeType?.includes("video");

  if (isVideo) {
    return null;
  }
  return (
    <Image {...props} />
  );
};
export default Media