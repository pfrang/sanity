import { IntrinsicTypeName, SchemaTypeDefinition, SlugRule } from "sanity";

interface IFactory<T extends Exclude<IntrinsicTypeName, "string">>{
  addSlug: () => SchemaTypeDefinition<T>
}


export const typeFactory = <T extends Exclude<IntrinsicTypeName, "string">>(schemaTypes: SchemaTypeDefinition<T>): IFactory<T> => {

  function addSlug() {

    if (!('fields' in schemaTypes)) return schemaTypes;

    const hasSlug = Array.isArray(schemaTypes.fields) && schemaTypes.fields.some((field) => {
      return field.type === 'slug' && field.name === 'slug';
    });

    if (hasSlug) {
      throw new Error(`Schema type "${schemaTypes.name}" already has a slug field.`);
    }

    const titleField = (schemaTypes.fields ?? []).find(field => field.name === 'name');
    const otherFields = (schemaTypes.fields ?? []).filter(field => field.name !== 'name');

    return {
      ...schemaTypes,
      fields: [
      ...(titleField ? [titleField] : []),
      {
        name: 'slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule: SlugRule) => Rule.required().error('Slug is required.'),
        hidden: ({ document }) =>  !document?.name
      },
      ...otherFields,
      ],
    } as SchemaTypeDefinition<T>;
  }

  return { ...schemaTypes, addSlug } as IFactory<T>;
}