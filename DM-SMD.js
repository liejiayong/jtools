/**
 * @description: 同步模块模式(SMD->Synchronous Module Definition)
 *
 * 定义：请求发出后，无论模块是否存在，立即执行后续的逻辑，实现模块开发中对模块的立即引用。
 *
 * 模块化：将复杂的系统分解为高内聚、低耦合模块
 *
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2021-05-28 11:13:03
 */

//定义模块管理器单体对象
var F = F || {};

/**
 * 创建模块的方法define
 * @param {String} str 模块路由
 * @param {Function} fn 模块方法
 */
F.define = function (str, fn) {
  //定义模块方法，本应该在闭包中定义，这里先忽略
  var parts = str.split('.'); //解析模块路由str
  //如果在闭包中，为了屏蔽对模块的直接访问，建议将模块添加给闭包内部私有变量
  //old，当前模块的祖父模块；parent，当前模块父模块
  old = parent = this;
  //i模块层级，len模块层级长度
  i = len = 0;
  //如果第一个模块是模块管理器单体对象，则移除
  if (parts[0] === 'F') {
    parts = parts.slice(1);
  }
  //屏蔽对define与module模块方法的重写
  if (parts[0] === 'define' || parts[0] === 'module') return;
  //遍历路由器并定义每层模块
  for (len = parts.length; i < len; i++) {
    //如果父模块中不存在当前模块，声明当前模块
    if (typeof parent[parts[i]] === 'undefined') parent[parts[i]] = {};
    //缓存下一级的祖父模块
    old = parent;
    //缓存下一级的父模块
    parent = parent[parts[i]];
  }
  //如果给定模块方法fn则定义改模块方法
  if (fn) {
    //此时i等于parts.length，故减1
    old[parts[--i]] = fn();
  }
  return this; //返回模块管理器单体对象
};
