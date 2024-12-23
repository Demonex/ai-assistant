import type { Config } from "payload";
import {
	BoldFeature,
	ItalicFeature,
	// LinkFeature,
	ParagraphFeature,
	lexicalEditor,
	UnderlineFeature,
} from "@payloadcms/richtext-lexical";

export const defaultLexical: Config["editor"] = lexicalEditor({
	features: () => {
		return [
			ParagraphFeature(),
			UnderlineFeature(),
			BoldFeature(),
			ItalicFeature(),
			/*LinkFeature({
        enabledCollections: ['pages', 'posts'],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            return !('name' in field && field.name === 'url');
          })

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: ({ linkType }) => linkType !== 'internal',
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
            },
          ]
        },
      }),*/
		];
	},
});
