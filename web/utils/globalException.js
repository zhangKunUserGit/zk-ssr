import Logger from './logger';

const fileTagNames = ['LINK', 'SCRIPT', 'IMG'];

export default function globalException() {
  // 这里只处理文件加载异常，比如图片，js, css 文件异常
  window.addEventListener(
    'error',
    ev => {
      const target = ev.target;
      if (target && target.tagName) {
        const currentTagName = target.tagName.toUpperCase();
        if (fileTagNames.includes(currentTagName)) {
          Logger.trackFileException({
            href: target.baseURI,
            fileUrl: target.src || target.href,
            type: ev.type
          });
        }
      }
    },
    true
  );

  window.onerror = function(message, source, row, col, error) {
    const exception = {};
    const url = source || document.URL;
    exception.error = new Error(message.toString());
    exception.error.stack = JSON.stringify({
      url: url,
      href: window.location.href,
      mapUrl: url + '.map',
      lineNumber: row,
      columnNumber: col,
      message: message,
      error
    });
    Logger.trackException(exception);
  };
}
