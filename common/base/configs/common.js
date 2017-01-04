/**
 * 配置参数
 */
//是否为壹钱包客户端标识
export const isApp = window.navigator.userAgent.indexOf('1qianbao') > 0;
//头部右侧图片
export const rightImage = 'http://' + (window.location.port? 'www.wanlitong.com' : window.location.host) + '/wap/mall/img/v4-icon-more.png';

export const ACCOUNTINVALID = 'account-invalid';