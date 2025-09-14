import { defineField, defineType } from "sanity";

export const accessibilityType = defineType({
  name: "accessibility",
  title: "Accessibility Statement",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
   
   defineField({
      name: 'description',
      title: 'Description Content',
      type: 'array',
      description: 'Rich content below the banner; supports text, headings, lists, and images',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Description of image for screen readers',
              validation: (Rule) => Rule.required().warning('Provide alt text for accessibility'),
            },
          ],
        },
      ],
    }),

    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
