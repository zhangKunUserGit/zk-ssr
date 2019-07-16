import Logger from './logger';

export default function globalEventListener() {
  // 收集所有带有data-track-event属性的事件
  window.addEventListener(
    'click',
    ev => {
      const el = ev.target;
      if (el.hasAttribute('data-track-event')) {
        Logger.trackClickEvent({
          position: el.getBoundingClientRect(),
          href: window.location.href,
          outerHTML: el.outerHTML
        });
      }
    },
    false
  );
}
