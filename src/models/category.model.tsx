import JSONModel, {JSONModelProps} from '@models/json.model';

interface CategoryModelType extends JSONModelProps {
  id?: number;
  title?: string;
}

export default class CategoryModel
  extends JSONModel
  implements CategoryModelType
{
  static safeInstance: (obj?: any) => CategoryModel;
  declare id?: number;
  declare title?: string;

  constructor(json: CategoryModelType) {
    super(json);
  }
}

CategoryModel.safeInstance = (obj?: any) => {
  if (obj instanceof CategoryModel) {
    return obj;
  }

  return new CategoryModel(obj ?? {});
};
