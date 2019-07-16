import { isBlank } from './string';

export function windowsScrollAnimation(targetY, currentY) {
  if (isBlank(currentY)) {
    currentY = document.body.scrollTop || document.documentElement.scrollTop;
  }
  // 计算需要移动的距离
  let needScrollTop = targetY - currentY;
  const dist = Math.ceil(needScrollTop / 16);
  currentY += dist;
  if (needScrollTop > 1 || needScrollTop < -1) {
    window.scrollTo(0, currentY);
    window.requestAnimationFrame(() => windowsScrollAnimation(targetY, currentY));
  } else {
    window.scrollTo(0, targetY);
  }
}
