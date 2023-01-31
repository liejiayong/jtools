/**
 * Class Control
 *
 * 对于处理class推荐使用原生classList方案，兼容性可以使用polyfill
 * https://github.com/yola/classlist-polyfill
 *
 */
/**
 * 存在类名
 * @param {HTMLElement} el
 * @param {String} cls
 */
export function hasClass(el, cls) {
  let reg = new RegExp(`(^|\\s)${cls}(\\s|$)`);
  return reg.test(el.className);
}

/**
 * 新增类名
 * @param {HTMLElement} el
 * @param {String} cls
 */
export function addClass(el, cls) {
  if (hasClass(el, cls)) {
    return;
  }
  let newCls = el.className.split(" ");
  newCls.push(cls);
  el.className = newCls.join(" ");
}

/**
 * 移除类名
 * @param {HTMLElement} el
 * @param {String} cls
 */
export function removeClass(el, cls) {
  if (!hasClass(el, cls)) {
    return;
  }
  let reg = new RegExp(`(^|\\s)${cls}(\\s|$)`);
  el.className = el.className.replace(reg, "");
}

/**
 * control cssText style
 * @param {HTMLElement} ele
 * @param {String} style
 */
export function getStyle(ele, style) {
  let ret;
  if (window.getComputedStyle) {
    ret = window.getComputedStyle(ele, null).getPropertyValue(style);
  } else {
    if (style === "opacity") {
      var filter = null;
      // 早期的 IE 中要设置透明度有两个方法：
      // 1、alpha(opacity=0)
      // 2、filter:progid:DXImageTransform.Microsoft.gradient( GradientType= 0 , startColorstr = ‘#ccccc’, endColorstr = ‘#ddddd’ );
      // 利用正则匹配
      filter =
        ele.style.filter.match(/progid:DXImageTransform.Microsoft.Alpha\(.?opacity=(.*).?\)/i) ||
        ele.style.filter.match(/alpha\(opacity=(.*)\)/i);
      if (filter) {
        var value = parseFloat(filter);
        if (!isNaN(value)) {
          // 转化为标准结果
          ret = value ? value / 100 : 0;
        }
      }
      // 透明度的值默认返回 1
      ret = 1;
    } else if (style === "float") {
      ret = ele.currentStyle.getAttribute("styleFloat");
    } else if ((style === "width" || style === "height") && ele.currentStyle[style] === "auto") {
      // 取高宽使用 getBoundingClientRect
      let clientRect = ele.getBoundingClientRect();
      ret = (style === "width" ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top) + "px";
    }
    // 其他样式，无需特殊处理
    ret = ele.currentStyle.getAttribute(style);
  }
  return ret;
}

/**
 * 添加css前缀
 * @param {String} style
 */
function preStyle(style) {
  var el = document.createElement("div");

  var vendor = (function () {
    var transformName = {
      webkit: "webkitTransform",
      Moz: "MozTransform",
      O: "OTransform",
      ms: "msTransform",
      standard: "transform",
    };
    for (var key in transformName) {
      if (el[key] !== "undefined") {
        return key;
      }
    }
    return false;
  })();

  if (vendor === false) {
    return false;
  }

  if (vendor === "standard") {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
function preStyleCss(style) {
  var el = document.createElement("div");

  var vendor = (function () {
    var transformName = {
      webkit: "webkitTransform",
      moz: "MozTransform",
      o: "OTransform",
      ms: "msTransform",
      standard: "transform",
    };
    for (var key in transformName) {
      if (el[key] !== "undefined") {
        return key;
      }
    }
    return false;
  })();

  if (vendor === false) {
    return false;
  }

  if (vendor === "standard") {
    return style;
  }

  return "-" + vendor + "-" + style;
}

/**
 * input元素选择兼容性处理
 * @param {*} id 可以为dom id 或class
 * @param {*} startPos
 * @param {*} endPos
 * @param {*} preSymbol
 * @param {*} endSymbol
 * @param {*} direction
 */
function inputSelection(id, startPos, endPos, preSymbol, endSymbol, direction) {
  var $el = document.querySelector(id),
    val = $el.value;

  if (!$el.tagName === "INPUT") return console.trace(":::the function is used to be input Element");

  $el.addEventListener("focus", function (e) {
    setTimeout(function () {
      sele($el);
    });
  });

  $el.addEventListener("click", function (e) {
    setTimeout(function () {
      sele($el);
    });
  });

  function sele($el) {
    if ($el.setSelectionRange) {
      startPos = startPos || 0;
      endPos = endPos || $el.value.length;
      direction = direction || "forward";
      $el.setSelectionRange(startPos, endPos, direction);
    } else {
      console.trace(":::setSelectionRange不兼容该方法");
    }
  }
}

/**
 * 获取dom宽高距离信息
 */
export const domInfo = {
  /**
   * 获取距离顶部距离
   * @param {HTMLElement} el
   */
  getElementTop(el) {
    let actualTop = el.offsetTop;
    let current = el.offsetParent;

    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  },
  // 获取距离左侧的距离
  getElementLeft(el) {
    let actualLeft = el.offsetLeft;
    let current = el.offsetParent;

    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    return actualLeft;
  },
};

/**
 * 判断是否DOM元素
 * @param {HTMLElement} el DOM Object
 */
export function isElement(el) {
  return typeof HTMLElement === "object"
    ? el instanceof HTMLElement
    : !!(el && typeof el === "object" && (el.nodeType === 1 || el.nodeType === 9) && typeof el.nodeName === "string");
}

/**
 * 获取窗口可视范围的高度
 */
export function getClientHeight() {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
}

/**
 * 获取窗口可视范围宽度
 */
export function getPageViewWidth() {
  let d = document,
    a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  return a.clientWidth;
}

/**
 * 获取窗口宽度
 */
export function getPageWidth() {
  let g = document,
    a = g.body,
    f = g.documentElement,
    d = g.compatMode == "BackCompat" ? a : g.documentElement;
  return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

/**
 * 获取窗口尺寸
 */
export function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  } else {
    // ie8及其以下
    if (document.compatMode === "BackCompat") {
      // 怪异模式
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      };
    } else {
      // 标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    }
  }
}

/**
 * 获取文档尺寸
 */
export function getDocBoundingRect() {
  var doc = document,
    width,
    height,
    scrollTop,
    scrollLeft;

  if (document.compatMode === "BackCompat") {
    width = doc.body.clientWidth;
    height = doc.body.clientHeight;
    scrollTop = doc.body.scrollTop;
    scrollLeft = doc.body.scrollLeft;
  } else {
    width = doc.documentElement.clientWidth;
    height = doc.documentElement.clientHeight;
    scrollTop = doc.documentElement.scrollTop;
    scrollLeft = doc.documentElement.scrollLeft;
  }

  return {
    documentWidth: Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth,
      document.documentElement.clientWidth
    ),
    width: width,
    height: height,
    scrollTop: scrollTop,
    scrollLeft: scrollLeft,
  };
}

/**
 *  获取页面滚动条距顶部高度
 */
export function getPageScrollTop() {
  let doc = document;
  return (
    doc.documentElement.scrollTop /* 标准 */ || window.pageYOffset /* Safari */ || doc.body.scrollTop /* IE6/7/8 */ || 0
  );
}
var scrollTop =
  document.documentElement.scrollTop /* 标准 */ ||
  window.pageYOffset /* Safari */ ||
  document.body.scrollTop; /* IE6/7/8 */

/**
 * 设置页面滚动条距顶部高度
 * @param {Number} top
 */
export function setPageScrollTop(top) {
  document.documentElement.scrollTop /* 标准 */ = top;
  window.pageYOffset /* Safari */ = top;
  document.body.scrollTop /* IE6/7/8 */ = top;
}

/**
 *  获取页面滚动条距左边的高度
 */
export function getPageScrollLeft() {
  let a = document;
  return a.documentElement.scrollLeft || a.body.scrollLeft;
}

/**
 * 返回当前元素滚动条位置
 * @param {HTMLElement} el
 */
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

/**
 * 滚动到指定元素区域
 * @param {HTMLElement} el
 */
export const smoothScroll = (el) => {
  document.querySelector(el).scrollIntoView({
    behavior: "smooth",
  });
};

/**
 * 平滑滚动到页面顶部
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

/**
 * 检查页面底部是否可见
 */
export const bottomVisible = () => {
  return (
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight || document.documentElement.clientHeight)
  );
};

/**
 * 引入link
 * @param {string} url
 */
function includeLinkStyle(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

/**
 * @description: 格式化文本
 * @param {*} str
 * @return {*}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2023-01-31 16:27:57
 */
function formatText(str) {
  str = str||''
  return str.replace(/style=".*?"/g,'').replace(/<br\s*\/?>/g,'')
}
