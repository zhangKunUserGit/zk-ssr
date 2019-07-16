import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { getCookie } from './cookies';
import { getGuid } from './get';

export default class Logger {
  static appInsights;

  /**
   * 初始化Logger
   */
  static initializeLogger() {
    Logger.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: '8ac082ed-a7cc-4aef-a587-f80188db22e8',
        // 禁止Fetch接口自动收集
        disableFetchTracking: true,
        // 禁止Ajax 接口自动收集
        disableAjaxTracking: true,
        // 禁止异常自动收集
        disableExceptionTracking: true
      }
    });
    Logger.appInsights.loadAppInsights();
    Logger.setAuthenticatedUserContext();
  }

  /**
   * 设置全局上下文
   * 用户基本信息
   */
  static setAuthenticatedUserContext() {
    let guid = getCookie('guid');
    if (!guid) {
      guid = getGuid();
    }
    // 如果用户已经登录则收集用户的email
    let email = getCookie('LoginName');
    if (email) {
      email = `-${email}`;
    }
    // 不能使用其他链接符，否则收集不到
    Logger.appInsights.setAuthenticatedUserContext(`${guid}${email}`);
  }
  /**
   * 依赖项日志收集
   * @param value
   */
  static trackDependency(value = {}) {
    Logger.appInsights.trackDependencyData(value);
  }

  /**
   * 异常收集
   * @param value
   */
  static trackException(value = {}) {
    Logger.appInsights.trackException(value);
  }

  /**
   * 文件加载异常收集
   * @param value
   */
  static trackFileException(value = {}) {
    Logger.appInsights.trackEvent({ name: 'FileException' }, { ...value });
  }

  /**
   * 页面跳转收集，包括加载性能收集
   */
  // 这块暂时不进行收集
  // static trackPageView() {
  //   Logger.appInsights.trackPageView({ name: window.location.pathname });
  // }

  /**
   * 用户点击事件收集
   * @param value
   */
  static trackClickEvent(value = {}) {
    Logger.appInsights.trackEvent({ name: 'UserClickEvent' }, { ...value });
  }
}
