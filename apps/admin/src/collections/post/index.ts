import type { CollectionConfig } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import defaultAccess from "@/utilities/defaultAccess";
import { postMedia } from "@/collections/post/media";

export const post: CollectionConfig = {
  slug: "post",
  access: defaultAccess,
  admin: {
    defaultColumns: [
      "title",
      "description",
      "preview",
    ],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "text",
      localized: true,
    },
    {
      name: "preview",
      type: "upload",
      relationTo: postMedia.slug as "post-media",
    },
    {
      name: "content",
      type: "richText",
      required: false,
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ];
        },
      }),
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
};
