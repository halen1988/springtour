//login through password
export const LOGIN_PATH_PASSWORD = "password";

// login through message
export const LOGIN_PATH_MSG = "msg";

export const LOGIN_MODE = {
    YQB:'yqb',
    WLT: 'wlt'
};
export const LOGIN_BY = {
    BY_PASS:' by-password',
    BY_MSG: ' by-msg'
};

export const H5_DATA_CLICK_RADIUS = 30;

export const REQUEST_TOKEN = {
    MZONE: 'mzone',
    APP_SERVER: 'appServer'
}


// key值 login Data session key (value 是登录返回的数据)
export const SESSION_KEY_LOGIN_DATA = 'loginData';

// key值 login mode (value 是yqb 或者 yqb 参考 LOGIN_MODE constant)
export const SESSION_KEY_LOGIN_MODE = 'loginMode';

// key值 登录名或者手机号(其实登录名就是手机号) (value: 手机号)
export const SESSION_KEY_USER_NAME = 'username';

// key值 from (value是当前页面的名称, 用于页面跳转返回时知道上一个页面叫什么, 我只是不喜欢用-1.。。呵呵
export const SESSION_KEY_FROM = 'from';

// key值 login Data session key (value 是登录返回的数据)
export const SESSION_KEY_MZONE_SESSION_ID = 'mzone_token';
export const SESSION_KEY_SIGNUP_STEP = 'signup_step';
export const SESSION_KEY_WLT_TOKEN = 'wlt.user';


//壹钱包短信登录模板
export const YQB_OTP_BUSINESSID = 'APPSMSDL2';

//万里通短信登录模板
export const WLT_OTP_BUSINESSID = 'APPWLTDXDLYQB';




// value值  登录页面
export const SESSION_VALUE_PAGE_LOGIN = 'login';

// value 值 setupLoginPassword的页面
export const SESSION_VALUE_PAGE_SET_LOGIN_PWD = 'setupLoginPassword';

// value 值 setupPayPassword的页面
export const SESSION_VALUE_PAGE_SET_PAY_PWD = 'setupPayPassword';

// value 值 bind的页面
export const SESSION_VALUE_PAGE_BIND = 'bind';

// value 值 forgetpassword的页面  忘记密码
export const SESSION_VALUE_PAGE_FORGET_PASSWORD = 'forgetpassword';

// value 值 SetupWltId的页面, 主要用于配置路由, 和页面跳转(history.push)
export const SESSION_VALUE_PAGE_SET_WLT_ID = 'SetupWltId';

// value 值 forgetPwd id的页面, 主要用于配置路由, 和页面跳转(history.push)
export const SESSION_VALUE_PAGE_FORGET_PWD_NAME = 'forgetPwdName';

// value 值 forgetPwd id的页面, 主要用于配置路由, 和页面跳转(history.push)
export const SESSION_VALUE_PAGE_FORGET_PWD_ID = 'forgetPwdId';

// value 值 forgetPwd pwd的页面, 主要用于配置路由, 和页面跳转(history.push)
export const SESSION_VALUE_PAGE_FORGET_PWD_PWD = 'forgetPwdPwd';

// value 值 forgetPwd success的页面, 主要用于配置路由, 和页面跳转(history.push)
export const SESSION_VALUE_PAGE_FORGET_PWD_SUCCESS = 'forgetPwdSuccess';

// value值 login的页面, 主要用于配置路由, 和页面跳转(history.push)
export const SESSION_VALUE_PAGE_SIGNUP = 'signup';

// value值 login的页面, 主要用于配置路由, 和页面跳转(history.push)
export const SESSION_VALUE_PAGE_SIGNUP_SUCCESS = 'signupsuccess';

// value值 passwordsuccess的页面, 主要用于配置路由, 和页面跳转(history.push)
export const SESSION_VALUE_PAGE_PASSWORD_SUCCESS = 'passwordsuccess';

// value值 certificate的页面
export const SESSION_VALUE_PAGE_CERTIFICATE = 'certificate';

// value值 signagreement的页面
export const SESSION_VALUE_PAGE_SIGNAGREEMENT = 'signagreement';

// value值 securityset的页面
export const SESSION_VALUE_PAGE_SECURITY_SET = 'securityset';


export const SESSION_VALUE_SET_WLT_CERT = 'wltCert';


//TODO: 绑定需要验证的项目 (后面根据后台返回的结果调整)
// 壹钱包证件号
export const BIND_TYPE_YQB_ID = 'Y1';

//壹钱包短信验证码
export const BIND_TYPE_YQB_OTP = 'Y2';

//壹钱包登录密码
export const BIND_TYPE_YQB_PWD = 'Y3';

//万里通证件号
export const BIND_TYPE_WLT_ID = 'W1';

//万里通短信验证码
export const BIND_TYPE_WLT_OTP = 'W2';

//万里通登录密码
export const BIND_TYPE_WLT_PWD = 'W3';


//后台接口成功信息
export  const API_BINDERROR1 = '1242';
export  const API_BINDERROR2 = '1243';
//后台接口成功信息
export  const API_SUCCESS_CODE = '1000';
// YQB未注册用户
export  const API_UN_SIGUP = '1011';
export  const ACCOUNT_LOCKED = "1014";

export const WLT_API_SIGN_UP = '1022';
export const APIERROR_LOGIN_TIMEOUT = '1024';

// WLT需要证件号登录
export const WLT_NEED_CERT = '1052';

// YQB 账户锁定
export const YQB_ACCOUNT_LOCK = '1014';


//验证错误信息提示
export const ERROR_MESSAGE_PAY_PASSWORD_EMPTY = '支付密码不可以为空';
export const ERROR_MESSAGE_PAY_PASSWORD_NUMBER = '支付密码必须是数字';
export const ERROR_MESSAGE_PAY_PASSWORD_DIGITS = '支付密码必须是6位';

export const ERROR_MESSAGE_SMS_MESSAGE_EMPTY = '短信验证码不可以为空';
export const ERROR_MESSAGE_SMS_MESSAGE_NUMBER = '短信验证码必须是数字';
export const ERROR_MESSAGE_SMS_MESSAGE_DIGITS = '短信验证码必须是6位';

export const ERROR_MESSAGE_CHECK_IdCARD = '身份证号码输入错误';
export const ERROR_MESSAGE_CHECK_PASSWORD = '密码格式不对';
export const ERROR_MESSAGE_SAME_PASSWORD = '两次输入的密码不一致，请重新输入';
export const ERROR_MESSAGE_EMPTY_IDNAME = '姓名不能为空';
export const ERROR_MESSAGE_DIGITS_IDNAME = '名称中包含数字';
export const ERROR_MESSAGE_CHART_IDNAME = '名称中含有特殊字符';


// 壹钱包 手机登录账号错误提示
export const YQB_ERROR_MESSAGE_LOGIN_ACCOUNT_EMPTY = '请输入手机号'; //手机号为空
export const YQB_ERROR_MESSAGE_LOGIN_ACCOUNT = '请输入11位手机号'; // 手机号小于11位
export const YQB_ERROR_MESSAGE_LOGIN_ACCOUNT_FORMAT = '手机号格式错误'; // 手机号还有特殊字符

// 万里通 登录账号错误提示
export const WLT_ERROR_MESSAGE_LOGIN_ACCOUNT_EMPTY = '请输入用户名'; //登录账号为空

// 万里通 手机账号错误提示 （ 同壹钱包）


//手机登录账号错误提示
export const H5_ERROR_MESSAGE_LOGIN_ACCOUNT_EMPTY = '请输入登录账号'; // 登录账号为空
export const H5_ERROR_MESSAGE_LOGIN_ACCOUNT = '请输入正确的登录账号'; // 登录账号小于11位
export const H5_ERROR_MESSAGE_LOGIN_ACCOUNT_FORMAT = '用户名格式错误'; // 登录账号含有特殊字符


//手机号错误提示
export const H5_ERROR_MESSAGE_MOBILE_EMPTY = '请输入手机号'; // 手机号为空
export const PC_ERROR_MESSAGE_MOBILE_EMPTY = '请填写正确的壹钱包账户'; // 空值点击登录
export const H5_ERROR_MESSAGE_MOBILE = '请输入正确账号'; // 手机号小于11位
export const H5_ERROR_MESSAGE_MOBILE_FORMAT = '手机号格式错误'; // 手机号含有特殊字符


//手机密码错误提示
export const H5_ERROR_MESSAGE_PASSWORD = '请输入正确密码'; //密码输入空格 or 密码输入小于8位

// 手机图形验证错误提示
export const H5_ERROR_MESSAGE_CAPTCHA = '验证码输入错误'; // 错误的图形验证码或者历史验证码
export const H5_ERROR_MESSAGE_CAPTCHA_EMPTY = '请输入图形验证码'; // 验证码为空

// 手机短息错误提示
export const H5_ERROR_MESSAGE_OTP_EMPTY = '请输入短信验证码';

// 身份证错误提示
export const H5_ERROR_MESSAGE_ID_CARD_EMPTY = '请输入证件号';
export const H5_ERROR_MESSAGE_ID_CARD = '证件号码错误';

// 设置登录密码错误提示
export const H5_ERROR_MESSAGE_SETUP_LOGIN_PASSWORD = '密码不符合复杂度要求, 请重设';
export const H5_ERROR_MESSAGE_SETUP_LOGIN_PASSWORD_EMPTY = '登录密码不能为空';
export const H5_ERROR_MESSAGE_SETUP_LOGIN_PASSWORD_SAME = '两次密码输入不一致,请重新输入';
export const H5_ERROR_MESSAGE_SETUP_LOGIN_PASSWORD_TEMPTY = '密码不能为空';

// 设置支付密码
export const H5_ERROR_MESSAGE_PAY_PASSWORD_TOO_SIMPLE = '您输入的支付密码太简单啦,请重新输入';
export const H5_ERROR_MESSAGE_PAY_PASSWORD_DIGITS = '请输入6位数字支付密码';
export const H5_ERROR_MESSAGE_PAY_PASSWORD_EMPTY = '支付密码不能为空';



//PC手机登录账号错误提示
export const ERROR_MESSAGE_LOGIN_ACCOUNT_EMPTY = '请填写正确的账户名'; // 登录账号为空
export const ERROR_MESSAGE_LOGIN_ACCOUNT_FORMAT = '用户名格式错误'; // 登录账号小于11位 or 登录账号含有特殊字符
export const ERROR_API_USER_NOT_FOUND = '会员不存在'; // 后端信息提示会员不存在字段
export const ERROR_API_USER_NOT_FOUND_CODE = '020101'; // 后端信息提示会员不存在facadeCode

export const ERROR_MESSAGE_LOGIN_ACCOUNT_FAIL = ''; //用户名或密码输入错误
//pc手机号错误提示
export const ERROR_MESSAGE_MOBILE = '请输入正确手机号'; // 手机号小于11位 or 手机号含有特殊字符
// 设置登录密码错误提示
export const ERROR_MESSAGE_SETUP_LOGIN_PASSWORD = '登录密码不符合要求,请重新输入';
export const ERROR_MESSAGE_SETUP_LOGIN_PASSWORD_EMPTY = '登录密码不能为空';
export const ERROR_MESSAGE_SETUP_LOGIN_PASSWORD_SAME = '两次登录密码输入不一致,请重新输入';















