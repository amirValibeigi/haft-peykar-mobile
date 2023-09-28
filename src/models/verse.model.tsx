import JSONModel, {JSONModelProps} from '@models/json.model';

interface VerseModelType extends JSONModelProps {
  id?: number;
  category_id?: number;
  title?: string;
}

export default class VerseModel extends JSONModel implements VerseModelType {
  static safeInstance: (obj?: any) => VerseModel;
  declare id?: number;
  declare category_id?: number;
  declare title?: string;

  constructor(json: VerseModelType) {
    super(json);
  }
}

VerseModel.safeInstance = (obj?: any) => {
  if (obj instanceof VerseModel) {
    return obj;
  }

  return new VerseModel(obj ?? {});
};
