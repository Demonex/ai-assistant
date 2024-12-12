import { View, Text } from "react-native";
import escapeHTML from "escape-html";

import  Link from "../../Link";
import { RichTextUpload } from "../Upload";
import { Fragment } from "react";

type Node = {
  type: string
  value?: {
    url: string
    alt: string
  }
  children?: Node[]
  url?: string
  [key: string]: unknown
  newTab?: boolean
}

export type CustomRenderers = {
  [key: string]: (args: { node: Node; Serialize: any/*SerializeFunction*/; index: number }) => any
}

type SerializeFunction = {
  content?: Node[]
  customRenderers?: CustomRenderers
}

const isText = (value: any): boolean =>
  typeof value === "object" && value !== null && typeof value.text === "string";

 const Serialize = ({ content, customRenderers }: SerializeFunction) => {
  return (
    <Fragment>
      {content?.map((node, i) => {
        if (isText(node)) {
          /*if(node.bold) {
            text = <strong key={i}>{text}</strong>;
          }

          if(node.code) {
            text = <code key={i}>{text}</code>;
          }

          if(node.italic) {
            text = <em key={i}>{text}</em>;
          }

          if(node.underline) {
            // text = (
            //   <span style={{ textDecoration: 'underline' }} key={i}>
            //     {text}
            //   </span>
            // )
            text = <Highlight key={i} {...node} />;
          }

          if(node.strikethrough) {
            text = (
              <span style={{textDecoration: 'line-through'}} key={i}>
                {text}
              </span>
            );
          }*/

          return (
            <Text className="text-gray-700 mt-8 mb-12 text-base" key={i}>
              {escapeHTML(node.text as string)}
            </Text>
          );
        }

        if (!node) {
          return null;
        }

        if (
          customRenderers &&
          customRenderers[node.type] &&
          typeof customRenderers[node.type] === "function"
        ) {
          return customRenderers[node.type]({ node, Serialize, index: i });
        }

        switch (node.type) {
          case "br":
            return <View key={i} />;
          /*case 'h1':
            return (
              <h1 key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h1>
            )
          case 'h2':
            return (
              <h2 key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h3>
            )
          case 'h4':
            return (
              <h4 key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h4>
            )
          case 'h5':
            return (
              <h5 key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h5>
            )
          case 'h6':
            return (
              <h6 key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h6>
            )
          case 'quote':
            return (
              <blockquote key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </blockquote>
            )
          case 'ul':
            return (
              <ul key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </ol>
            )
          case 'li':
            return (
              <li key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </li>
            )*/
          case "link":
            return (
              <Link
                key={i}
                type={node.linkType === "internal" ? "reference" : "custom"}
                url={node.url}
                reference={node.doc}
                newTab={node?.newTab}
              >
                <Serialize content={node.children} customRenderers={customRenderers} />
              </Link>
            );

          case "upload": {
            return <RichTextUpload key={i} node={node} />;
          }

          /*case 'label':
            return (
              <Label key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </Label>
            )

          case 'video': {
            const { source, id: videoID } = node

            if (source === 'vimeo' || source === 'youtube') {
              return <Video key={i} platform={source} id={videoID as string} />
            }

            return null
          }*/

          default:
            return (
              <View key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </View>
            );
        }
      })}
    </Fragment>
  );
};
export default Serialize