// validate DOM start
/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const isNode = function (value) {
  return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const isNodeList = function (value) {
  var type = Object.prototype.toString.call(value);

  return (
    value !== undefined &&
    (type === '[object NodeList]' || type === '[object HTMLCollection]') &&
    'length' in value &&
    (value.length === 0 || isNode(value[0]))
  );
};

/**
 * Check if argument is a SVG element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const isSvg = function (value) {
  return value !== undefined && value instanceof SVGElement;
};
// validate DOM end

// validate JS type start
/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const isString = function (value) {
  return typeof value === 'string' || value instanceof String;
};

/**
 * Check if argument is a Symbol.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const isSymbol = function (value) {
  return typeof value === 'symbol';
};

/**
 * 检查是否数字
 * @param {Number} value
 * @return {Boolean}
 */
export const isNumber = function (value) {
  var type = Object.prototype.toString.call(value);

  return type === '[object Number]';
};

/**
 * 检查是否 Boolean
 * @param {Number} value
 * @return {Boolean}
 */
export const isBoolean = function (value) {
  var type = Object.prototype.toString.call(value);

  return type === '[object Boolean]';
};

/**
 * 检查是否 Date
 * @param {Number} value
 * @return {Boolean}
 */
export const isDate = function (value) {
  var type = Object.prototype.toString.call(value);

  return type === '[object Date]';
};

/**
 * 检查是否 RegExp
 * @param {Number} value
 * @return {Boolean}
 */
export const isRegExp = function (value) {
  var type = Object.prototype.toString.call(value);

  return type === '[object RegExp]';
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const isFn = function (value) {
  var type = Object.prototype.toString.call(value);

  return type === '[object Function]';
};

/**
 * 检查变量是否 Object 对象
 * @param {Object} value
 * @return {Boolean}
 */
export const isObject = function (value) {
  var type = Object.prototype.toString.call(value);

  return type === '[object Object]';
};
export const isObjectStructure = function (value) {
  return value === Object(value);
};

/**
 * 检查变量是否 Array 对象
 * @param {Object} value
 * @return {Boolean}
 */
export const isArray = function (value) {
  var type = Object.prototype.toString.call(value);

  return type === '[object Array]';
};
// validate JS type end

// validate  start
// validate  end
