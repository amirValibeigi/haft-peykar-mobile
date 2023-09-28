import VerseModel from '@models/verse.model';
import FilterModel from '@models/filter.model';
import {getVersesQuery} from '@queries/verse.query';

export default class VerseRepository {
  getDB = (filter?: Partial<FilterModel<VerseModel>>) =>
    getVersesQuery(FilterModel.safeInstance(filter));
}
