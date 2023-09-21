import ResponseDataModel, {StatusType} from '@models/ResponseDataModel';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import {REACT_APP_URL_SITE} from '@env';
import {deepAssign} from './Utils';

const successStatus = [200, 201, 202, StatusType.success];

type TData = {[key: string]: object} | undefined | null;
type TOptions = {dataMapTo?: TData; dataDefMapTo?: TData};

function middlewareResponseDataModel(
  {dataMapTo, dataDefMapTo}: TOptions,
  response: AxiosResponse<ResponseDataModel>,
) {
  return Promise.resolve(
    new ResponseDataModel({
      ...response.data,
      mapTo: dataMapTo,
      defMapTo: dataDefMapTo,
      message: response.data?.message,
      status: successStatus.includes(response.status)
        ? StatusType.success
        : StatusType.warning,
    }),
  );
}

function middlewareError(
  {dataMapTo, dataDefMapTo}: TOptions,
  error: AxiosError,
) {
  const rdm = new ResponseDataModel({
    ...(error.response?.data ?? {}),
    axios: error,
    mapTo: dataMapTo,
    defMapTo: dataDefMapTo,
    status: StatusType.error,
  });

  return Promise.reject(rdm);
}

const defaultConfig = {
  baseURL: REACT_APP_URL_SITE + '/api',
};

const defaultConfigJSON = {
  baseURL: REACT_APP_URL_SITE + '/api',
  headers: {
    Accept: 'application/json',
  },
};

export function axiosApi<D>(
  config?: AxiosRequestConfig<D> | null,
): AxiosInstance {
  const axiosCache = axios.create(deepAssign(defaultConfig, config ?? {}));

  // axiosCache.interceptors.request.use(middlewareAddToken as any);

  return axiosCache;
}

export function axiosRDApi<D>(
  config?: AxiosRequestConfig<D> | undefined | null,
  options?: TOptions,
): AxiosInstance {
  const tmpAxios = axiosApi(config ?? defaultConfigJSON);

  tmpAxios.interceptors.response.use(
    middlewareResponseDataModel.bind(null, options ?? {}) as any,
    middlewareError.bind(null, options ?? {}),
  );

  return tmpAxios;
}
