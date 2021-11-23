/**
 * 模拟 instanceof 检测 实例对象 是否属于 构造函数
 * @param {Object} install 实例对象
 * @param {Object} obj 构造函数
 * @returns
 */
function mockInstanceof(install, obj) {
  if (typeof install !== 'object') {
    return false;
  }
  while (true) {
    if (install === null) {
      return false;
    }
    if (install.__proto__ === obj.prototype) {
      return true;
    }
    install = install.__proto__;
  }
}
