import QueryBuilder from 'react-native-realm-query';

import {globalFiltered, mapTo} from '@libs/database-utils';
import VerseModel from '@models/verse.model';
import FilterModel from '@models/filter.model';
import {VERSE_SCHEMA} from '@tables/verse.table';

export const getVersesQuery = (filter: FilterModel<VerseModel>) =>
  new Promise<VerseModel[] | undefined>((resole, reject) => {
    try {
      const verseQuery = new QueryBuilder<VerseModel>(VERSE_SCHEMA);

      globalFiltered(verseQuery, filter.makeParam(), VERSE_SCHEMA);

      resole(mapTo(verseQuery.get(), VerseModel, []));
    } catch (err) {
      reject(err);
    }
  });
