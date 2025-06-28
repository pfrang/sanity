import { defineField, ImageRule, StringRule } from "sanity";
import { typeFactory } from "../typeFactory";
import { documentTypes } from "../constants";

export const associationType = typeFactory({
  name: documentTypes.ASSOCIATION,
  title: 'Association',
  type: 'document',
  groups: [{ name: 'texts', title: 'Texts' }],

  fields: [
    defineField({
      name: 'name',
      type: 'string',
      description: 'Name of the association',
      validation: (Rule: StringRule) => Rule.required().min(1).max(100)
    }),
    defineField({
      name: 'logo',
      type: 'image',
      description: 'Logo of the association',
      options: {
        hotspot: true
      },
      validation: (Rule: ImageRule) => Rule.required()
    }),
    defineField({
      name: 'description',
      type: 'text',
      description: 'Description of the association',
      group: 'texts',
    }),
    defineField({
      name: 'richText',
      type: 'array',
      of: [{ type: 'block' }],
      readOnly: ({ document }) => Boolean(document?.description),
      group: 'texts',
    }),
    defineField({
      name: 'events',
      type: 'array',
      description: 'Events organized by the association',
      of: [{ type: 'reference', to: [{ type: documentTypes.EVENT}] }],
      validation: (Rule) => 
        Rule.custom((value, context) => {
          // Only validate if user is trying to add events
          if (value && value.length > 0) {
            const richText = context?.document?.richText as [];
            
            // Check if richText is empty or only contains empty blocks
            const hasContent = richText && 
              richText.length > 0 && 
              richText.some((block: any) => 
                block._type === 'block' && 
                block.children && 
                block.children.some((child: any) => child.text && child.text.trim().length > 0)
              );

            if (!hasContent) {
              return 'You must add content to the rich text field before adding events.';
            }
          }
          return true;
        })
    })
  ],

  preview: {

    select: {
      title: 'name',
      firstEventTitle: 'events.0.name',
      events: 'events',
      media: 'logo'
    },

    prepare({ title, firstEventTitle, events, media }) {
     const eventCount = Object.keys(events).length;
      let subtitle = 'No events';
    
      if (eventCount > 0) {
        subtitle = firstEventTitle || 'Untitled event';
        if (eventCount > 1) {
          subtitle += ` (+${eventCount - 1} more)`;
        }
      }

      return {
        title: title || 'No name',
        subtitle: subtitle || 'No event',
        media: media || undefined,
      };
    }
  },
  
}).addSlug()

