import {
	BoldFeature,
	ItalicFeature,
	// LinkFeature,
	ParagraphFeature,
	UnderlineFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Config } from "payload";

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
