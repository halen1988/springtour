/**
 * 服务端接口列表
 */
let apiPatch = 'https://test1-h5.stg.wanlitong.com';
apiPatch = window.apiPatch.match(/^\$/)? apiPatch : window.apiPatch +'/'; //本地环境

//mtp接口
let mzonePatch = 'https://test3-mzone.stg.yqb.com/mzone-http';
mzonePatch = window.mzonePatch && window.mzonePatch.match(/^\$/)? mzonePatch : window.mzonePatch +'/'; //本地环境
window.riskPatch = window.riskPatch && window.riskPatch.match(/^\$/)?"https://test3-d2.stg.1qianbao.com":window.riskPatch;

mzonePatch = /.*\/$/.test(mzonePatch)?mzonePatch.slice(0,mzonePatch.length-1):mzonePatch;

let productPath = '/mobileapi/m2s/product/';


const API = {
	decrypToken: apiPatch + productPath + 'member/decrypToken.do',//获取万里通token解密接口
	//获取楼层数据
	getShopData: apiPatch + 'floorData/shop_data.json',//获取购物楼层数据
	getFinanceData: apiPatch + 'floorData/finance_data.json',//获取购物楼层数据
	getLifeData: apiPatch + 'floorData/life_data.json',//获取购物楼层数据
	getCreditsData: apiPatch + 'floorData/credits_data.json',//获取购物楼层数据

	//密码操作
	passwordLoginYQB: `${mzonePatch}/user/yqb/password_login`, // YQB密码登录
	passwordLoginWLT: `${mzonePatch}/user/wlt/password_login`, // WLT密码登录
	smsLoginYQB: `${mzonePatch}/user/yqb/sms_login`, //YQB短信登录
	smsLoginWLT: `${mzonePatch}/user/wlt/sms_login`, //WLT短信登录
	certLoginWLT: `${mzonePatch}/user/wlt/cert_login`, //WLT证件登录
	logout: `${mzonePatch}/user/logout`, //登出操作
	qrToken: `${mzonePatch}/user/token`, //YQB生成二维码token
	qrTokenLogin: `${mzonePatch}/user/token/login`, //YQB 二维码登录状态查询
	captcha: `${mzonePatch}/captcha/image_code`, // 刷新图片验证码
	captchaVerify: `${mzonePatch}/captcha/image_code/verify`, // 验证图片验证码
	jsQuery: `${mzonePatch}/captcha/js/query`, // 查询js运算函数
	encryptKeys: `${mzonePatch}/encryption/keys`,

	//绑定
	getBindOption: `${mzonePatch}/user/bind/option`, // 查询用户可以bind账号及bind需要的验证项
	bind: `${mzonePatch}/user/bind`, //进行bind操作

	//短信操作
	sendSms: `${mzonePatch}/sms/send_sms`, // 通用短信发送
	sendRegisterSms: `${mzonePatch}/sms/send_register_sms`, // 壹钱包获取注册短信OTP
	sendLoginSms: `${mzonePatch}/sms/send_login_sms`, // 壹钱包获取注册短信OTP

	signup:`${mzonePatch}/user/register`, // 注册
	setpassword: `${mzonePatch}/user/login_pass`, //设置登录密码
	sendSignupSms :`${mzonePatch}/sms/send_register_sms`, //发送注册短信
	setrealname:`${mzonePatch}/user/real_name`, //实名
	setPayPwd: `${mzonePatch}/user/pay_pass`, //设置支付密码
	setLoginPwd: `${mzonePatch}/user/login_pass`, //设置登录密码
	sendSignupSms :`${mzonePatch}/sms/send_register_sms`, //发送注册短信
	verifyLoginpassOtp :`${mzonePatch}/user/verify_login_pass_otp`, //忘记密码校验接口
	setPwdPwd: `${mzonePatch}/user/forget_login_pass`, //新设置登录密码		
	identityNo:	`${mzonePatch}/valid/identity_no`, //证件号校验接口

	//token互换
	exchangeYQBToken:mzonePatch+"/token/yqb",//MZONE登录态换取壹钱包accessToken
	exchangeWLTToken:mzonePatch+"/token/wlt/h5",//MZONE登录态换取wlt h5 Tokenf(双向bind的用户可用) TODO: 废弃可删除
	exchangeWLTToken4PC:mzonePatch+"/token/wlt/pc",//MZONE登录态换取wlt pc Token TODO: 废弃可删除
	exchangeWLTTokenUni: `${mzonePatch}/token/wlt/h5/one`, //统一使用用来换取登录态 （可以在单向绑定的时候依然可以使用）
	exchangeMzoneToken: `${mzonePatch}/token/mzone`, // 使用wltToken, accessToken 换取 mzone token

	//壹钱包用户信息查询
	yqbUserInfoQuery: `${mzonePatch}/user/yqb/info`

};

export default API