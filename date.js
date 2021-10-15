/**
 * @description: JavaScript Date 工具荟萃
 * @param {*}
 * @return {*}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2021-10-15 16:34:56
 */

/**
 * 获取当月总天数
 * @param {Number} year 年
 * @param {Number} month 月
 */
export function getMonthLen(year, month) {
  return new Date(year, month, 0).getDate();
}
