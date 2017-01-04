
import { SESSION_VALUE_PAGE_BIND,SESSION_VALUE_PAGE_LOGIN
	,SESSION_VALUE_PAGE_FORGET_PASSWORD,SESSION_VALUE_PAGE_PASSWORD_SUCCESS
	,SESSION_VALUE_PAGE_SIGNUP_SUCCESS,SESSION_VALUE_PAGE_SIGNUP,SESSION_VALUE_PAGE_SECURITY_SET
} from "./Enum"

/*在当前页面点击顶层的登录时 登陆后不应该返回
 被这个数组中的表达式匹配的URL 在点击登录时候是不会添加returnUrl的，防止操作完后返回登录
 *   忘记密码    ，注册  ，绑定  ，我的 页面
 * */
export let toLoginWithoutReturnUrlList=[
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_FORGET_PASSWORD}$`) , //匹配忘记密的3个步奏
	new RegExp(`/account(/)?#/setpassword$`) ,
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_PASSWORD_SUCCESS}$`) ,
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_SIGNUP}$`) ,            //匹配注册相关的链接
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_SECURITY_SET}$`) ,
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_SIGNUP_SUCCESS}$`) ,
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_BIND}$`) ,    //绑定
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_LOGIN}$`) ,    //登录
]

/*这里显示需要登录态才能显示的页面， 这些页面中退出时必须跳转到首页*/
export let tokenNeededPages=[
	new RegExp(`/mall(/|/index.shtml/?|/index.html/?)?#/cart$`) ,    //购物车
	new RegExp(`(/)?#/mine$`) ,    //我的
]

export const WHITELIST = [

		//yqb www
		'test5-www.stg.yqb.com',
		'test3-www.stg.yqb.com',
		'test2-www.stg.yqb.com',
		'test-www.stg.yqb.com',

		//yqb m
		'test5-m.stg.yqb.com',
		'test3-m.stg.yqb.com',
		'test2-m.stg.yqb.com',
		'test-m.stg.yqb.com',

		//1qianbao
		'test6-h5.stg.1qianbao.com',
		'test5-h5.stg.1qianbao.com',
		'test3-h5.stg.1qianbao.com',
		'test2-h5.stg.1qianbao.com',
		'test-h5.stg.1qianbao.com',
		'h5-uat.1qianbao.com',
		'h5.1qianbao.com',

	];