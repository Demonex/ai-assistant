import { View } from "react-native";

import Serialize,{ CustomRenderers,  } from "./Serialize";

type RichTextProps = {
  className?: string
  content: any
  customRenderers?: CustomRenderers
}
 const RichTex = ({ className, content, customRenderers }: RichTextProps) => {
  if (!content) {
    return null;
  }

  return (
    <Serialize content={content} customRenderers={customRenderers} />
  );
};
export default RichTex