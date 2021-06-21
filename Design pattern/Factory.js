/**
 * @description: 工厂模式（Factory Pattern）
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2021-06-18 11:19:03
 */

// 原型继承
function inheritPrototype(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
Object.create();
