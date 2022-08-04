import request, { cancelRequest } from "./index";

// mock request1
request.request({
  method: "get",
  url: "/api/v1/topics",
  canRepeat: false,
  params: { id: 1 },
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      console.log("实例请求拦截器111");

      return config;
    },
    // 响应拦截器
    responseInterceptors: (result) => {
      console.log("实例响应拦截器111");
      return result;
    },
  },
});

// mock cancal
cancelRequest("/api/v1/topics");

// mock request2
request.request({
  method: "get",
  url: "/api/v1/topics",
  params: { id: 2 },
  canRepeat: false,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      console.log("实例请求拦截器111");

      return config;
    },
    // 响应拦截器
    responseInterceptors: (result) => {
      console.log("实例响应拦截器111");
      return result;
    },
  },
});
