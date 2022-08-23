import Request from "../index";
interface NormalizeRequestConfig<T> extends RequestConfig {
  data?: T;
}
interface NormalizeResponse<T> {
  code: number;
  message: string;
  data: T;
}

const axios = new Request({
  baseURL: "https://cnodejs.org/",
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      console.log("实例请求拦截器");

      return config;
    },
    // 响应拦截器
    responseInterceptors: (result) => {
      console.log("实例响应拦截器");
      return result;
    },
  },
});

export const request = <D, T = any>(config: NormalizeRequestConfig<D>) => {
  return axios.request<NormalizeResponse<T>>(config);
};
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return axios.cancelRequest(url);
};
// 取消全部请求
export const cancelAllRequest = () => {
  return axios.cancelAllRequest();
};

export default axios;
