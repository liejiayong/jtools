/**
 * @description: 装饰者模式（Decorator pattern）
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2021-06-18 11:50:00
 */

function eventDecorator(el, fn) {
  var oldEventFn = el.onclick;
  console.log('oldEventFn', oldEventFn);
  el.onclick = function () {
    oldEventFn && oldEventFn();
    fn();
  };
}

var div = document.querySelector('div');
div.addEventListener('click', function () {
  console.log('addEventListener click.');
});
eventDecorator(div, function () {
  console.log('addEventListener click test.');
});
div.onclick = function () {
  console.log('onclick click.');
};
eventDecorator(div, function () {
  console.log('onclick click test.');
});
