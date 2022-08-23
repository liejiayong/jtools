/**
 * @author liejiayong (809206619@qq.com)
 * @description aixos拦截器遵循先进后出原则
 * @Date: 2022-07-01 14：34：45
 * @LastEditTime: 2022-08-04 18:29:28
 * @LastEditors: liejiayong(809206619@qq.com)
 * @Description: In User Settings Edit
 */
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
  successCodeList?: number[];
  canRepeat?: boolean;
}
export interface ResponseConfig extends AxiosResponse {
  is2Catch?: boolean /* 用于拦截ResponseConfig触发catch时使用，后面预算使用successCodeList替换 */;
}

export interface RequestInterceptors {
  requestInterceptors?: (config: RequestConfig) => RequestConfig;
  requestInterceptorsCatch?: (err: any) => any;

  responseInterceptors?: (config: ResponseConfig) => ResponseConfig;
  responseInterceptorsCatch?: (err: any) => any;
}

export interface CancelRequestSource {
  [index: string]: () => void;
}

const isBoolean = (val: unknown) => Object.prototype.toString.call(val) === "[object Boolean]";

class Request {
  instance: AxiosInstance;
  interceptorsObj?: RequestInterceptors;
  /**
   * 预算请求成功code，用于resolve状态回调data。成功状态永远在then获取，失败状态永远在catch获取
   */
  successCodeList?: number[];
  /*
   * 存放取消方法的集合
   * 在创建请求后将取消请求方法 push 到该集合中
   * 封装一个方法，可以取消请求，传入 url: string|string[]
   * 在请求之前判断同一URL是否存在，如果存在就取消请求
   */
  cancelRequestSourceList?: CancelRequestSource[];
  /*
   * 存放所有请求URL的集合
   * 请求之前需要将url push到该集合中
   * 请求完毕后将url从集合中删除
   * 添加在发送请求之前完成，删除在响应之后删除
   */
  requestUrlList?: string[];

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;

    // 数据初始化
    this.successCodeList = config.successCodeList || [200];
    this.requestUrlList = [];
    this.cancelRequestSourceList = [];

    /* 拦截器的执行顺序为实例请求→类请求→实例响应→类响应 */
    // 类请求
    this.instance.interceptors.request.use(
      (res: RequestConfig) => {
        return res;
      },
      (err: any) => err
    );

    // 实例请求
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );

    // 实例响应
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );

    // 最后执行执行类响应
    this.instance.interceptors.response.use(
      (res: ResponseConfig) => {
        return res;
      },
      (err: any) => err
    );
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 链接请求期间是否允许同时发送相同链接请求
      config.canRepeat = isBoolean(config.canRepeat) ? config.canRepeat : true;

      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }

      const { url, canRepeat } = config;

      if (!canRepeat && url) {
        this.requestUrlList?.push(url);
        config.cancelToken = new axios.CancelToken((c) => {
          this.cancelRequestSourceList?.push({
            [url]: c,
          });
        });
      }

      this.instance
        .request<any, ResponseConfig>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }

          res.is2Catch ? reject(res.data) : resolve(res.data);
          // !!~this.successCodeList.indexOf(res?.data?.code) ? resolve(res.data) : reject(res.data);
        })
        .catch((err: any) => {
          reject(err);
        })
        .finally(() => {
          url && this.delUrl(url);
        });
    });
  }

  /**
   * @description: 获取指定 url 在 cancelRequestSourceList 中的索引
   * @param {string} url
   * @returns {number} 索引位置
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestSourceList?.findIndex((item: CancelRequestSource) => {
      return Object.keys(item)[0] === url;
    }) as number;
  }
  /**
   * @description: 删除 requestUrlList 和 cancelRequestSourceList
   * @param {string} url
   * @returns {*}
   */
  private delUrl(url: string) {
    const urlIndex = this.requestUrlList?.findIndex((u) => u === url);
    const sourceIndex = this.getSourceIndex(url);
    // 删除url和cancel方法
    urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1);
    sourceIndex !== -1 && this.cancelRequestSourceList?.splice(sourceIndex as number, 1);
  }
  // 取消全部请求
  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach((source) => {
      const key = Object.keys(source)[0];
      source[key]();
    });
  }
  // 取消单个请求
  cancelRequest(url: string | string[]) {
    if (typeof url === "string") {
      // 取消单个请求
      const sourceIndex = this.getSourceIndex(url);
      sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]();
    } else {
      // 存在多个需要取消请求的地址
      url.forEach((u) => {
        const sourceIndex = this.getSourceIndex(u);
        sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u]();
      });
    }
  }
}

export default Request;
