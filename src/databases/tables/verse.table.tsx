import {ObjectSchema} from 'realm';

export const VERSE_SCHEMA = 'verses';

export const VerseSchema: ObjectSchema = {
  name: VERSE_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    category_id: 'int',
    title: 'string',
  },
};
