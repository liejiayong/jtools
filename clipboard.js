import Vue from 'vue';
import Clipboard from 'clipboard';

function clipboardSuccess() {
  Vue.prototype.$baseMessage('复制成功', 'success');
}

function clipboardError() {
  Vue.prototype.$baseMessage('复制失败，请手动复制', 'error');
}

/**
 * @copyright JyLie 809206619@qq.com
 * @description 复制数据
 * @param {*} event
 * @param {*} text
 */
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  });
  clipboard.on('success', () => {
    clipboardSuccess();
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    clipboardError();
    clipboard.destroy();
  });
  clipboard.onClick(event);
}
