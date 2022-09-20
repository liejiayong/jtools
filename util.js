/**
 * js获取字符串实际长度（区分英文和中文）
 * 前128个字符就是ASCII码，占用一个字节
 * 第33～126号(共94个)是字符，其中第48～57号为0～9十个阿拉伯数字；
 * 65～90号为26个大写英文字母，97～122号为26个小写英文字母；其余为一些标点符号、运算符号等。
 * 128个之后是扩展码（Unicode码），占用2个字节
 * Unicode中文汉字编码范围，16进制表示：\u4e00(对应汉字是"一")至\u9fa5(对应汉字是"龥")，对应的十进制：19968至40869
 * @param str
 * @returns
 */
function getStrLength(str) {
  if (str == null || str == undefined || str == '') {
    return 0;
  }

  var realLength = 0;
  var charCode = -1;
  var strLength = str.length;
  for (var i = 0; i < strLength; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    } else {
      realLength += 2;
    }
  }
  return realLength;
}


/**
 * @description: 数字剪切，默认为千位
 * @param {*} str 输入值
 * @param {*} digit 位数
 * @return {*} 剪切数值
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2022-09-20 11:12:59
 */
function transferNum(str = '', digit = 3) {
  const strs = String(str)
  const arr = strs.split('.')
  const len = (arr[0] || '').length
  if (len <= digit) {
    return strs
  }

  let prefix = arr[0].substring(0, len - digit)
  let suffix = arr[0].substring(len - digit).slice(0, 1)
  suffix = suffix == '0' ? '' : `.${suffix}`
  console.log(prefix, suffix)
  return `${prefix}${suffix}k`
}
