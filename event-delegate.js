/**
 *
 *  事件稳妥局限性:
 * 比如 focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托；
 * mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的；
 *
 * @param parentCls
 * @param targetCls
 * @param events
 * @param callback
 */

function addEventListener(parentCls, events, targetCls, callback) {
  function targetHandle(e) {
    var event = e || window.event;
    var currentTarget = event.currentTarget;
    var target = event.target || window.srcElement;

    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (ele) {
          var matches = this.document || this.ownerElement;
          ele, (i = matches.length);
          while (--i >= 0 && matches.item(i) !== this) {
            return i > -1;
          }
        };
    }
    // 匹配触发元素
    while (target !== currentTarget) {
      if (target.matches(targetCls)) {
        var tri = target;
        callback.call(tri, Array.prototype.slice.call(arguments));
      }
      target = target.parentNode;
    }
  }

  // 判断传进事件长度，🌧一则遍历
  var eventsLen = events.split(' ').length;
  if (eventsLen && eventsLen === 1) {
    document.querySelector(parentCls).addEventListener(events, targetHandle);
    return;
  } else if (eventsLen > 1) {
    events.split(' ').forEach(function (evt) {
      Array.prototype.slice.call(document.querySelectorAll(parentCls)).forEach(function (eachP) {
        eachP.addEventListener(evt, targetHandle);
      });
    });
    return;
  }
}
