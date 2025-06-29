import {  DatetimeRule, defineField, GeopointRule, StringRule, TextRule } from "sanity";
import { CalendarIcon } from '@sanity/icons';
import { typeFactory } from "../typeFactory";
import { documentTypes } from "../constants";
import { InputField } from "../components/input-field";

export const eventType = typeFactory({
  name: documentTypes.EVENT,
  title: 'Event',
  type: 'document', 
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      description: 'Title of the event',
      validation: (Rule: StringRule) => Rule.required().min(1).max(100)
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      description: 'Date and time of the event',
      validation: (Rule: DatetimeRule) => Rule.required()
    }),
    defineField({
      name: 'outside',
      type: 'string',
      options: {
        list: [
          'inside',
          'outside',
          'both'
        ],
        layout: 'radio'
      },
    }),
    defineField({
      name: 'location',
      type: 'geopoint',
      description: 'Location of the event',
      validation: (Rule: GeopointRule) => Rule.required()
    }),
    defineField({
      name: 'description',
      type: 'text',
      description: 'Description of the event',
      validation: (Rule: TextRule) => Rule.required().min(1).max(500),
      components: {
        input: InputField
      }
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'date',
      media: 'location'
    },

    prepare({ title, subtitle, media }) {
      return {
        title: title || 'No title',
        subtitle: subtitle ? new Date(subtitle).toLocaleString() : 'No date',
        media: media || undefined,
      };
    }
  }
}).addSlug();