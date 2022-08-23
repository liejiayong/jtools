import Request from "./index";
import type { RequestConfig } from "./index";

interface NormalizeRequestConfig<T> extends RequestConfig {
  data?: T;
}
interface NormalizeResponse<T> {
  code: number;
  message: string;
  data: T;
}

const http = new Request({
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

const NormalizeRequest = <D, T = any>(config: NormalizeRequestConfig<D>) => {
  const { method = "GET" } = config;
  if (method === "GET" || method === "get") {
    config.params = config.data;
  }
  return http.request<NormalizeResponse<T>>(config);
};

export default NormalizeRequest;
