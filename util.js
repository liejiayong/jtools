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
