/**
 * @description: jQuery 扩展工具荟萃
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2021-06-02 11:43:08
 */

/**
 * 为jQuery.prototype新增数字滚动效果
 */
function addJQFnCountUp() {
  if ('jQuery' in window || 'Zepto' in window) {
    /**
     * 数字滚动效果
     * @param {Object} options 配置项
     * @param {String} options.easing 动画效果。默认：swing
     * @param {Number} options.endNum 最终数字
     * @param {Number} options.duration 动画持续时间，unit:ms
     * @url https://api.jquery.com/animate/
     *
     * $.animate( properties [, duration ] [, easing ] [, complete ] ) => $.animate({}={[styleName]:[styleValue]},duration=400,ease='swing',complete=()={})
     * $.animate( properties, options ) => $.animate({}={[styleName]:[styleValue]},{duration=400,ease='swing',queue=true,specialEasing={},step=(now,tween)=>{},complete=()={},...})
     */
    $.fn.countUp = function (options) {
      var defaults = { lastNumber: 10, duration: 200, easing: 'swing' };
      var opts = $.extend({}, defaults, options);
      $(this).animate(
        {
          placeholder: /* set_a_placeholderKey-Value_to_trigger_the_animate_callback_function_step */ options.endNum,
        },
        {
          duration: opts.duration,
          easing: opts.easing,
          complete: function () {},
          step: function (now, tween) {
            $(this).html(~~now);
          },
        }
      );
    };
  }
}
