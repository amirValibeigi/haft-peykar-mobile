import QueryBuilder from 'react-native-realm-query';

import {globalFiltered, mapTo} from '@libs/database-utils';
import CategoryModel from '@models/category.model';
import FilterModel from '@models/filter.model';
import {CATEGORY_SCHEMA} from '@tables/category.table';

export const getCategoriesQuery = (filter: FilterModel<CategoryModel>) =>
  new Promise<CategoryModel[] | undefined>((resole, reject) => {
    try {
      const categoryQuery = new QueryBuilder<CategoryModel>(CATEGORY_SCHEMA);

      globalFiltered(categoryQuery, filter.makeParam(), CATEGORY_SCHEMA);

      resole(mapTo(categoryQuery.get(), CategoryModel, []));
    } catch (err) {
      reject(err);
    }
  });
