import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;

  responseInterceptors?: <T = AxiosResponse>(config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;

  // 链接请求期间是否允许同时发送相同链接请求
  canRepeat?: boolean;
}

export interface CancelRequestSource {
  [index: string]: () => void;
}
