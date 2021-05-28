/**
 * @description: 汇集 BOM 相关工具函数
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2021-05-27 11:39:27
 */

/**
 * brower添加url收藏
 * @param {String} sURL window.location
 * @param {String} title 标题
 */
export function addFavorite(sURL, title) {
  sURL = sURL || window.location;
  title = title || document.title;

  try {
    window.external.addFavorite(sURL, title);
  } catch (e) {
    try {
      window.sidebar.addPanel(title, sURL, '');
    } catch (e) {
      alert('加入收藏失败，请使用Ctrl+D进行添加');
    }
  }
}

/**
 * 浏览器设置首页
 * @param {window} brower 浏览器对象
 * @param {String} url 被设置为首页的url
 */
export function setHome(brower, url) {
  //debugger;
  //谷歌下url为数组对象非字符串
  url = url || window.location.url;

  try {
    brower.style.behavior = 'url(#default#homepage)';
    brower.setHomePage(url);
  } catch (e) {
    if (window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
      } catch (e) {
        alert(
          "此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。"
        );
      }
      var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(
        Components.interfaces.nsIPrefBranch
      );
      prefs.setCharPref('browser.startup.homepage', url);
    }
  }
}

/**
 * 打开一个窗口
 * @param { string } url
 * @param { string } windowName
 * @param { number } width
 * @param { number } height
 */
export function openWindow(url, windowName, width, height) {
  var x = parseInt(screen.width / 2.0) - width / 2.0;
  var y = parseInt(screen.height / 2.0) - height / 2.0;
  var isMSIE = navigator.appName == 'Microsoft Internet Explorer';
  if (isMSIE) {
    var p = 'resizable=1,location=no,scrollbars=no,width=';
    p = p + width;
    p = p + ',height=';
    p = p + height;
    p = p + ',left=';
    p = p + x;
    p = p + ',top=';
    p = p + y;
    window.open(url, windowName, p);
  } else {
    var win = window.open(
      url,
      windowName,
      'top=' +
        y +
        ',left=' +
        x +
        ',scrollbars=' +
        scrollbars +
        ',dialog=yes,modal=yes,width=' +
        width +
        ',height=' +
        height +
        ',resizable=no'
    );
    eval('try { win.resizeTo(width, height); } catch(e) { }');
    win.focus();
    win.opener = null;
  }
}

/* broswer fullscreen */
export const winFulllScreen = {
  /**
   * 开启全屏
   * @param {*} element
   */
  request: function (element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen();
    }
  },
  /**
   *  关闭全屏
   */
  cancel: function () {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  },
};
