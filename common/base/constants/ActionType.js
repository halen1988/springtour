/**
 * Created by: 史元君
 Desc:
 */

//登录动作类型
export const PASSWORD_LOGIN = "passwordLogin";
export const LOGOUT = "logout";
export const LOGOUT2URL = "addLogoutToUrl";
export const LOGIN = "login";
export const GET_CAPTCHA = 'getCaptcha';
export const GET_JS_QUERY = 'getJsQuery';
export const CAPTCHA_TOKEN = 'captchaToken'

//OTP短信操作
export const SEND_SMS = 'sendSms';
export const SEND_REGISTER_SMS = 'sendRegisterSms';
export const SEND_LOGIN_SMS = 'sendLoginSms';

//设置密码
export const SETUP_PASSWORD = "setupPassword";
export const SETUP_PAY_PASSWORD = "setupPayPassword";
export const BIND_TYPE = 'bindType';

//绑定
export const BIND = 'bind';
export const GET_BIND_OPTION = 'getBindOption';
// sign up
export const SIGNUP = "signup";
export const SETUP_SECURITY = "setupsecurity";
export const SETPASSWORD = "setpassword";

//登录态相关
export const GETACCESSTOKEN = "getAccessToken";
export const GETWLTTOKEN = "getWltToken";
export const GETWLTPCTOKEN = "getWltPcToken";

//路由切换，地址栏变动
export const UPDATE_ROUTE_PATH = "changeRoutePath";
//主题切换
export const CHANGE_TOPIC_ACTION = "changeTopicAction";
//页面大小改变
export const SCREEN_RESIZZE = "screen_resize";