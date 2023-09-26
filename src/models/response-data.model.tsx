import JSONModel, {JSONModelProps} from '@models/json.model';

export enum StatusType {
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export type AssignRDMType<T> = T extends undefined
  ? ResponseDataModelType
  : ResponseDataModelType & T;

export type DetailType = {loc: Array<string>; msg: string; type: string};

interface ResponseDataModelType extends JSONModelProps {
  message?: string;
  detail?: string | DetailType;
  status?: StatusType;
  count?: number;
  axios?: any;
}

export default class ResponseDataModel
  extends JSONModel
  implements ResponseDataModelType
{
  declare message?: string;
  declare detail?: string | DetailType;
  declare status?: StatusType;
  declare count?: number;
  declare axios?: any;

  constructor(json: ResponseDataModelType) {
    super(json);

    if (!json.message) {
      this.message =
        typeof json.detail === 'string' ? json.detail : json.detail?.msg;
    }

    this.nowMap();
  }
}
