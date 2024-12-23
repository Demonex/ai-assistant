import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { tenant } from "@/collections/tenant";

export const model: CollectionConfig = {
  slug: "model",
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
      name: "tenant",
      type: "relationship",
      relationTo: tenant.slug as 'tenant',
      required: true
    },
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
      name: "type",
      type: "select",
      options: ['llm', 'embedding', 'reranker'],
      required: true,
    },
    {
      name: "settings",
      type: "json",
      required: true,
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
