/**
 * @description: 处理一步await 方案
 * @param {*}
 * @return {*}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2022-02-05 22:39:45
 *
 * await-to方案：https://www.npmjs.com/package/await-to-js
 */


/**
 * 使用： async function f() {
   const [err,data]=toAwait(Promise.reject('test error!'))
 }
 * @param promise 
 * @returns 
 */
function toAwait<T>(promise: Promise<T>) {
  return promise
    .then((data: T) => {
      return [null, data];
    })
    .catch(err => {
      return [err, undefined];
    });
}
