import type { CollectionConfig } from "payload";
import { parse } from "cookie";
import { unsign } from "cookie-signature";
import Redis from "ioredis";
import defaultAccess from "@/utilities/defaultAccess";
import { userMediaAvatar } from "@/collections/user/media/avatar";

const RedisSessionStore = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: 6379,
});

export const user: CollectionConfig = {
  slug: "user",
  access: defaultAccess,
  admin: {
    hideAPIURL: true,
    defaultColumns: [
      "avatar",
      "name",
      "username",
      "email",
      "language",
    ],
    useAsTitle: "email",
  },
  auth: {
    disableLocalStrategy: true,
    strategies: [
      {
        name: "redis-sessions",
        authenticate: async ({ headers }) => {
          const sid = parse(headers.get("cookie") || "")?.sid;
          if (!sid) {
            return {
              user: null,
            };
          }

          const key = unsign(sid.slice(2), process.env.COOKIE_SECRET);

          const userCache = key
            ? JSON.parse(await RedisSessionStore.get(`${process.env.REDIS_SESSION_PREFIX}:${key}`) || "null")?.user ?? null
            : null;

          if (userCache) {
            userCache["collection"] = user.slug;
          }

          return {
            user: userCache,
          };
        },
      },
    ],

  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Info",
          description: "Basic info of user.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "name",
                  type: "text",
                  admin: {
                    width: "70%",
                  },
                },
                {
                  name: "avatar",
                  type: "upload",
                  relationTo: userMediaAvatar.slug as "user-media-avatar",
                  admin: {
                    width: "30%",
                    components: {
                      // Cell: AvatarCell
                    },
                  },
                },
                {
                  name: "roles",
                  type: "select",
                  hasMany: true,
                  unique: true,
                  options:[
                    'admin',
                    'user',
                  ]
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "username",
                  type: "text",
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "email",
                  type: "text",
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "password",
                  type: "text",
                  admin: {
                    hidden: true,
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Subscriptions",
          description: "Subscriptions & Payment",
          fields: [
            {
              name: "wallet",
              type: "group",
              fields: [
                {
                  name: "balance",
                  type: "number",
                },
              ],
            },
          ],
        },
        {
          label: "Extra",
          description: "Additional params & UI settings",
          fields: [
            {
              name: "location",
              type: "text",
            },
            {
              name: "bio",
              type: "textarea",
            },
            {
              name: "language",
              type: "select",
              options: ["en", "ru"],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
};
