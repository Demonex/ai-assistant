import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { tenantMedia } from "@/collections/tenant/media";
import { user } from "@/collections/user";
import type { TFunction } from "@payloadcms/translations";

export const tenant: CollectionConfig = {
  slug: "tenant",
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
      relationTo: tenantMedia.slug as "tenant-media",
    },
    {
      name: "superadmins",
      type: "relationship",
      hasMany: true,
      relationTo: user.slug as "user",
      admin: {
        components: {
          Label: "@/components/FieldLabelTooltip/index",
        } as any,
      },
    },
    {
      name: "admins",
      type: "relationship",
      hasMany: true,
      relationTo: user.slug as "user",
      admin: {
        components: {
          Label: "@/components/FieldLabelTooltip/index",
        } as any,
      },
    },
    {
      name: "collections",
      type: "relationship",
      hasMany: true,
      relationTo: user.slug as "user",
      admin: {
        components: {
          Label: "@/components/FieldLabelTooltip/index",
        } as any,
      },
    },
    {
      name: "models",
      type: "relationship",
      hasMany: true,
      relationTo: user.slug as "user",
      admin: {
        components: {
          Label: "@/components/FieldLabelTooltip/index",
        } as any,
      },
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
