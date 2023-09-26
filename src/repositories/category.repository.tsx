import CategoryModel from '@models/category.model';
import FilterModel from '@models/filter.model';
import {getCategoriesQuery} from '@queries/category.query';

export default class CategoryRepository {
  getDB = (filter?: Partial<FilterModel<CategoryModel>>) =>
    getCategoriesQuery(FilterModel.safeInstance(filter));
}
