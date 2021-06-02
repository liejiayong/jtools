/**
 * @description: JavaScript 相面业务工具荟萃
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2021-06-02 11:44:45
 */

/* 获取移动终端浏览器版本信息 */
export const browerTerminal = (function () {
  var u = navigator.userAgent,
    dpr = window.devicePixelRatio,
    sw = window.screen.width,
    sh = window.screen.height;

  return {
    trident: ~u.indexOf('Trident') ? true : false,
    presto: ~u.indexOf('Presto') ? true : false,
    webKit: !!u.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
    gecko: ~u.indexOf('Gecko') && ~u.indexOf('KHTML') ? true : false,
    Symbian: ~u.indexOf('Symbian') ? true : false,
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? true : false,
    android: !u.indexOf('Android') || !u.indexOf('Linux') ? true : false,
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) ? true : false,
    iPhone: ~u.indexOf('iPhone') ? true : false,
    iPad: ~u.indexOf('iPad') ? true : false,
    osx: !!u.match(/\(Macintosh\; Intel /),
    iphoneXS:
      /iphone/gi.test(u) &&
      ((dpr == 3 && sw == 375 && sh == 812) ||
        (dpr == 3 && sw == 414 && sh == 896) ||
        (dpr == 2 && sw == 414 && sh == 896))
        ? true
        : false,
    wechat: /micromessenger/i.test(u),
    qq: /QQ\//i.test(u),
    weiBo: /WeiBo/i.test(u),
    Safari: /Safari/i.test(u),
    qqBrw: /MQQBrowser/i.test(u),
    win: /Win\d{2}|Windows/.test(u),
    wp: !!u.match(/Windows Phone ([\d.]+)/),
    webos: !!u.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
    touchpad: this.webos && !!u.match(/TouchPad/),
    kindle: !!u.match(/Kindle\/([\d.]+)/),
    silk: !!u.match(/Silk\/([\d._]+)/),
    blackberry: !!u.match(/(BlackBerry).*Version\/([\d.]+)/),
    bb10: !!u.match(/(BB10).*Version\/([\d.]+)/),
    rimtabletos: !!u.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
    playbook: !!u.match(/PlayBook/),
    chrome: !!u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/),
    webview: !!u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    uc: ~u.indexOf('UBrowser') || ~u.indexOf('UCBrowser') ? true : false,
    firefox: !!u.match(/Firefox\/([\d.]+)/),
    firefoxos: !!u.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
    ie: !!u.match(/MSIE\s([\d.]+)/) || !!u.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
    edge: this.ie && ~u.indexOf('Edge') ? true : false,
    ieV: (function () {
      var isIE11 = ~u.indexOf('Trident') && ~u.indexOf('rv:11.0') ? true : false;
      if (this.ie) {
        var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
        reIE.test(u);
        var fIEVersion = parseFloat(RegExp['$1']);
        if (fIEVersion === 7) {
          return 7;
        } else if (fIEVersion === 8) {
          return 8;
        } else if (fIEVersion === 9) {
          return 9;
        } else if (fIEVersion === 10) {
          return 10;
        } else {
          return 6; // IE版本<=7
        }
      } else if (this.edge) {
        return 'edge'; // edge
      } else if (isIE11) {
        return 11; // IE11
      } else {
        return 0; // 不是ie浏览器
      }
    })(),
  };
})();

/**
 * 判断iphoneX series系列
 */
export const isIphoneXS = () => {
  const u = navigator.userAgent,
    dpr = window.devicePixelRatio,
    sw = window.screen.width,
    sh = window.screen.height;
  return (
    /iphone/gi.test(u) &&
    ((dpr == 3 && sw == 375 && sh == 812) ||
      (dpr == 3 && sw == 414 && sh == 896) ||
      (dpr == 2 && sw == 414 && sh == 896))
  );
};

/**
 * 判断是否移动端
 */
export const isMobile = () => !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);

/**
 * 判断微信浏览器
 */
export const isWechat = () => !!~navigator.userAgent.toLowerCase().indexOf('micromessenger');

/**
 * 匹配QQ与TIM
 */
export const isQQ = () => {
  const u = navigator.userAgent;
  let match = u.match(/QQ\//i);
  match = match ? match[0] : false;
  return match == 'QQ/';
};

/**
 * 验证手机格式
 * @param {*} tel
 */
export const isTel = (tel) => /(^[1][2,3,4,5,6,7,8,9][0-9]{9}$)|(^[2,8,6][0-9]{7}$)|(^[2,3,5,6,9][0-9]{7}$)/.test(tel);

/**
 *  验证手机机身码(IMEI)
 *  @param { string|number } value 15~17位数字
 */
export const isIMEI = (value) => /^\d{15,17}$/g.test(value);

/**
 * 验证必须带端口号的网址(或ip)
    foo://example.com:8042/over/there?name=ferret#nose
    \_/   \______________/\_________/ \_________/ \__/
    |           |            |            |        |
  scheme     authority       path        query   fragment
 * 
 * 
 * @param { String } value
 */
export const isHttpAndPort = (value) => /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value);

/**
 *  验证网址(支持端口和"?+参数"和"#+参数)
 *  @param { String } value
 */
export const isHttp = (value) =>
  /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(value);

/**
 *  验证子网掩码
 *  @param { String } value
 */
export const isSubnetMask = (value) =>
  /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/g.test(value);

/**
 * 验证ip-v4
 * @param { String } value
 */
export const isIPv4 = (value) =>
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g.test(value);

/**
 * 验证ip-v6
 * @param { String } value
 */
export const isIPv6 = (value) =>
  /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(
    value
  );

/**
 *  验证视频链接地址（视频格式可按需增删）
 *  @param { String } value
 */
export const isVideoUrl = (value) =>
  /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i.test(value);

/**
 *  验证图片链接地址（图片格式可按需增删）
 *  @param { String } value
 */
export const isImageUrl = (value) => /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(value);

/**
 * 验证base64格式
 * @param { String } value
 */
export const isBase64 = (value) =>
  /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i.test(
    value
  );

/**
 *  验证迅雷链接(宽松匹配)
 *  @param { String } value
 */
export const isThunderLink = (value) => /^thunderx?:\/\/[a-zA-Z\d]+=$/g.test(value);

/**
 *  验证ed2k链接(宽松匹配)
 *  @param { String } value
 */
export const ised2k = (value) => /^ed2k:\/\/\|file\|.+\|\/$/g.test(value);

/**
 *  验证磁力链接(宽松匹配)
 *  @param { String } value
 */

export const isMagnet = (value) => /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/g.test(value);
/**
 *  验证linux隐藏文件路径
 *  @param { String } value
 */
export const isLinuxHiddenFilePath = (value) => /^\/(?:[^/]+\/)*\.[^/]*/g.test(value);

/**
 *  验证linux文件夹路径
 *  @param { String } value
 */
export const isLinuxFolderPath = (value) => /^\/(?:[^/]+\/)*$/g.test(value);

/**
 *  验证linux文件路径
 *  @param { String } value
 */
export const isLinuxFilePath = (value) => /^\/(?:[^/]+\/)*[^/]+$/g.test(value);

/**
 *  验证window"文件夹"路径
 *  @param { String } value
 */
export const isWindowsFolderPath = (value) => /^[a-zA-Z]:\\(?:\w+\\?)*$/g.test(value);

/**
 *  验证window下"文件"路径
 *  @param { String } value
 */
export const isWindowsFilePath = (value) => /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/g.test(value);

/**
 *  验证股票代码(A股)
 *  @param { String } value
 */
export const isAShare = (value) =>
  /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/g.test(value);

/**
 *  验证大于等于0, 小于等于150, 支持小数位出现5, 如145.5, 用于判断考卷分数
 *  @param { String } value
 */
export const isGrade = (value) => /^150$|^(?:\d|[1-9]\d|1[0-4]\d)(?:.5)?$/g.test(value);

/**
 * 验证日期
 * @param { String } value
 */
export const isDate = (value) => /^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/g.test(value);

/**
 *  验证md5格式(32位)
 *  @param { String } value
 */
export const isMD5 = (value) => /^([a-f\d]{32}|[A-F\d]{32})$/g.test(value);

/**
 *  验证24小时制时间（HH:mm:ss）
 *  @param { String } value
 */
export const is24Hour = (value) => /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/g.test(value);

/**
 *  验证12小时制时间（hh:mm:ss）
 *  @param { String } value
 */
export const is12Hour = (value) => /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/g.test(value);

/**
 *  验证数字/货币金额（支持负数、千分位分隔符）
 * @param { String } value
 */
export const isMoneyAll = (value) => /^-?\d+(,\d{3})*(\.\d{1,2})?$/g.test(value);

/**
 *  验证数字/货币金额 (只支持正数、不支持校验千分位分隔符)
 * @param { String } value
 */
export const isMoney = (value) =>
  /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/g.test(value);

/**
 *  验证银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）
 * @param { String } value
 */
export const isAccountNumber = (value) => /^[1-9]\d{9,29}$/g.test(value);

/**
 *  验证中文姓名
 * @param { String } value
 */
export const isChineseName = (value) => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value);

/**
 *  验证英文姓名
 * @param { String } value
 */
export const isEnglishName = (value) => /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value);

/**
 * 验证邮政编码(中国)
 * @param { String } value
 */
export const isPostcode = (value) =>
  /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value);

/**
 *  验证统一社会信用代码
 *  @param { String } value
 */
export const isCreditCode = (value) => /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(value);

/**
 * 验证火车车次
 * @param { String } value
 */
export const isTrainNum = (value) => /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(value);

/**
 *  验证车牌号(新能源)
 * @param { String } value
 */
export const isLicensePlateNumberNER = (value) =>
  /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g.test(
    value
  );

/**
 *  验证车牌号(非新能源)
 * @param { String } value
 */
export const isLicensePlateNumberNNER = (value) =>
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g.test(
    value
  );

/**
 *  验证车牌号(新能源+非新能源)
 * @param { String } value
 */
export const isLicensePlateNumber = (value) =>
  /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(
    value
  );

/**
 *  验证手机号中国(严谨), 根据工信部2020年最新公布的手机号段
 * @param { String } value
 */
export const isMPStrict = (value) =>
  /^(?:(?:\+|00)86)?1(?:(?:[23][\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(
    value
  );

/**
 *  验证手机号中国(宽松), 只要是12,13,14,15,16,17,18,19开头即可
 * @param { String } value
 */
export const isMPRelaxed = (value) => /^(?:(?:\+|00)86)?1[2-9]\d{9}$/g.test(value);

/**
 *  验证手机号中国(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条
 * @param { String } value
 */
export const isMPMostRelaxed = (value) => /^(?:(?:\+|00)86)?1\d{10}$/g.test(value);

/**
 *  验证email(邮箱)
 * @param { String } value
 */
export const isEmail = (value) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(
    value
  );

/**
 *  验证座机电话(国内),如: 0341-86091234
 * @param { String } value
 */
export const isLandlineTelephone = (value) => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value);

/**
 *  验证身份证号(1代,15位数字)
 * @param { String } value
 */
export const isIDCardOld = (value) => /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/g.test(value);

/**
 *  验证身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
 * @param { String } value
 */
export const isIDCardNew = (value) => /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g.test(value);

/**
 *  身份证号, 支持1/2代(15位/18位数字)
 * @param { String } value
 */
export const isIDCard = (value) =>
  /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(
    value
  );

/**
 * @description: 获取身份证性别
 *  性别（1：男，2：女）
 *  奇数为男，偶数为女
 *  一代身份证，15位身份证号码：第7、8位为出生年份(两位数)，第9、10位为出生月份，第11、12位代表出生日期，第15位代表性别。
    二代身份证，18位身份证号码：第7、8、9、10位为出生年份(四位数)，第11、第12位为出生月份，第13、14位代表出生日期，第17位代表性别。
 * @param { String } idCard 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-15 10:46:05
 */
export const getIDGender = (idCard) => {
  let id = idCard.trim();
  if (id.length === 18) {
    if (Number.parseInt(id.substring(16, 17)) % 2 == 0) {
      return 2;
    } else {
      return 1;
    }
  } else if (id.length === 15) {
    if (Number.parseInt(id.substring(14, 15)) % 2 == 0) {
      return 2;
    } else {
      return 1;
    }
  }
  return 0;
};

/**
 *  验证护照（包含香港、澳门）
 * @param { String } value
 */
export const isPassport = (value) =>
  /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(value);

/**
 *  验证帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
 * @param { String } value
 */
export const isWebAccount = (value) => /^[a-zA-Z]\w{4,15}$/g.test(value);

/**
 *  验证中文/汉字
 * @param { String } value
 */
export const isChineseCharacter = (value) =>
  /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(
    value
  );

/**
 * 验证小数
 * @param { String } value
 */
export const isDecimal = (value) => /^\d+\.\d+$/g.test(value);

/**
 * 验证数字
 * @param { String } value
 */
export const isNumber = (value) => /^\d{1,}$/g.test(value);

/**
 *  验证html标签(宽松匹配)
 * @param { String } value
 */
export const isHTMLtags = (value) => /<(\w+)[^>]*>(.*?<\/\1>)?/g.test(value);

/**
 * 验证qq号格式正确
 * @param { String } value
 */
export const isQQNum = (value) => /^[1-9][0-9]{4,10}$/g.test(value);

/**
 *  验证数字和字母组成
 * @param { String } value
 */
export const isNumAndStr = (value) => /^[A-Za-z0-9]+$/g.test(value);

/**
 *  验证英文字母
 * @param { String } value
 */
export const isEnglish = (value) => /^[a-zA-Z]+$/g.test(value);

/**
 *  验证大写英文字母
 * @param { String } value
 */
export const isCapital = (value) => /^[A-Z]+$/g.test(value);

/**
 * 验证小写英文字母组成
 * @param { String } value
 */
export const isLowercase = (value) => /^[a-z]+$/g.test(value);

/**
 * 验证密码强度，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 * @param { String } value
 */
export const isCorrectFormatPassword = (value) =>
  /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/g.test(value);

/**
 * 验证用户名，4到16位（字母，数字，下划线，减号）
 * @param { String } value
 */
export const isCorrectFormatUsername = (value) => /^[a-zA-Z0-9_-]{4,16}$/g.test(value);

/**
 * 验证16进制颜色
 * @param { String } value
 */
export const isColor16 = (value) => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value);

/**
 * 验证微信号，6至20位，以字母开头，字母，数字，减号，下划线
 * @param { String } value
 */
export const isWeChatNum = (value) => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value);

/**
 * 验证中文和数字
 * @param { String } value
 */
export const isCHNAndEN = (value) =>
  /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(
    value
  );

/**
 * 验证不能包含字母
 * @param { String } value
 */
export const isNoWord = (value) => /^[^A-Za-z]*$/g.test(value);

/**
 * 验证java包名
 * @param { String } value
 */
export const isJavaPackage = (value) => /^([a-zA-Z_][a-zA-Z0-9_]*)+([.][a-zA-Z_][a-zA-Z0-9_]*)+$/g.test(value);

/**
 *  验证版本号格式必须为X.Y.Z
 *  @param { String } value
 */
export const isVersion = (value) => /^\d+(?:\.\d+){2}$/g.test(value);
