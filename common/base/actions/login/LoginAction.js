/**
 * Created by Sean on 10/9/16.
 */
import {
   LOGIN, LOGOUT, PASSWORD_LOGIN, GET_CAPTCHA, CAPTCHA_TOKEN, SEND_LOGIN_SMS,LOGOUT2URL
}
    from "../../constants/ActionType";
import utils,{getLoginDataFromCache} from "../../utils/utils";
import {sessionCache,localCache} from "../../utils/cache";
import * as Enum from '../../constants/Enum';
import api from '../../configs/api';
import {Popup} from '../../components/popup/popup';
import cookie from "../../../../common/base/utils/cookie";

export function persistLoginData(result, loginMode, h5SaveLoginModeCookie) {
    eraseLoginData();
    if(result && result.data) {
        localCache.put(Enum.SESSION_KEY_MZONE_SESSION_ID, result.data.sessionId);
        sessionCache.put(Enum.SESSION_KEY_LOGIN_DATA, result.data);
        sessionCache.put(Enum.SESSION_KEY_LOGIN_MODE, loginMode);
        localCache.put(Enum.SESSION_KEY_LOGIN_MODE, loginMode);
        //为了解决uc失效问题，h5端只对loginMode保存处理
        h5SaveLoginModeCookie && cookie(Enum.SESSION_KEY_LOGIN_MODE, loginMode);
    }
}


export function eraseLoginData() {

    sessionCache.remove(Enum.SESSION_KEY_LOGIN_DATA);
    localCache.remove(Enum.SESSION_KEY_WLT_TOKEN);
    sessionCache.remove(Enum.SESSION_KEY_LOGIN_MODE);
    localCache.remove(Enum.SESSION_KEY_MZONE_SESSION_ID);
    //清除uc的cookie
    cookie(Enum.SESSION_KEY_LOGIN_MODE, null);

}

/*
 * 用法 passwordLoginYQBAction().then(({isLogin,payload})=>{....})
 *
 * isLogin为是否登录成功，payload为用户数据 then可选
 * */
export function passwordLoginYQBAction(inputParams, popup = false) {

    return (dispatch) => {
        return utils.mzoneFetch(api.passwordLoginYQB, inputParams, {method: 'post'})
            .then(function (result) {
                /*测试账号锁定*/
                // return Promise.reject({resultCobaide:1014})
                /*测试账号锁定*/

                if (result.resultCode === Enum.API_SUCCESS_CODE) {

                    persistLoginData(result, Enum.LOGIN_MODE.YQB);
                    dispatch({
                        type: PASSWORD_LOGIN,
                        isLogin: true,
                        payload: result.data
                    });
                    dispatch({
                        type: LOGIN,
                        isLogin: true,
                        payload: result.data
                    });

                    if(result.data.binded){
                        return dispatch(exchangeWLTccessToken(result.data.sessionId)).then(()=> result.data)
                    }
                    return result.data;


                } else {


                    dispatch({
                        type: GET_CAPTCHA,
                        payload: 'resetCaptcha'
                    })

                    /**
                     * 密码登录失败刷新captcha
                     */
                    dispatch(getCaptchaAction());

                    // username or password error
                    popup && (result.resultCode !== Enum.YQB_ACCOUNT_LOCK) &&Popup(result.resultMsg);
                    dispatch({
                        type: PASSWORD_LOGIN,
                        payload: false
                    })


                    return Promise.reject(result)
                }
            });
    }
}

export function clearLoginData() {

    return (dispatch)=> {
        dispatch({
            type: PASSWORD_LOGIN,
            payload: ''
        });
    }
}

export function passwordLoginWLTAction(inputParams, popup = false) {

    return (dispatch) => {
        return utils.mzoneFetch(api.passwordLoginWLT, inputParams, {method: 'post'})
            .then(function (result) {

                if (result.resultCode === Enum.API_SUCCESS_CODE) {

                    persistLoginData(result, Enum.LOGIN_MODE.WLT);
                    dispatch({
                        type: PASSWORD_LOGIN,
                        isLogin: true,
                        payload: result.data
                    });


                    dispatch({
                        type: LOGIN,
                        isLogin: true,
                        payload: result.data
                    });
                    if(result.data.binded){
                        return dispatch(exchangeWLTccessToken(result.data.sessionId)).then(()=> result.data )
                    }
                    return result.data;
                } else {

                    dispatch({
                        type: GET_CAPTCHA,
                        payload: 'resetCaptcha'
                    });

                    /**
                     * 密码登录失败刷新captcha
                     */
                    dispatch(getCaptchaAction());
                    popup && Popup(result.resultMsg);

                    return Promise.reject(result)
                }
            });
    }

}

    export function getCaptchaAction() {

        return (dispatch) => {
            return utils.mzoneFetch(api.captcha)
                .then(function (res) {
                    if (res.resultCode === Enum.API_SUCCESS_CODE) {
                        dispatch({
                            type: GET_CAPTCHA,
                            payload: res.data
                        })
                    }
                })
        }
    }

    export function clearCaptchaTokenAction() {
        return (dispatch) => {
            dispatch({
                type: CAPTCHA_TOKEN,
                payload: ''
            })
        }
    }
    /*
     使用方式
     getQRLoginToken().then(
     ({token})=>{},
     (failMsg)=>alert(failMsg)
     )
     * */
    export function getQRLoginToken() {
    return utils.getJSToken().then(({jsToken, jsResult})=> {
        return utils.mzoneFetch(api.qrToken, {jsToken, jsResult}).then(
            res=> {
                if (res.resultCode === Enum.API_SUCCESS_CODE) {
                    return {
                        token: res.data.token
                    }
                } else {
                    return Promise.reject("获取二维码失败");
                }
            }
        )
    })
}

export function queryQRLogin(token) {
    return (dispatch)=>{
        return utils.mzoneFetch(api.qrTokenLogin, {token}).then(res=> {
            if (res.resultCode === Enum.API_SUCCESS_CODE) {
                persistLoginData(res, Enum.LOGIN_MODE.YQB);
                dispatch({
                    type: PASSWORD_LOGIN,
                    isLogin: true,
                    payload: res.data
                });
                if(res.data.binded){
                    return dispatch(exchangeWLTccessToken(res.data.sessionId)).then(()=> res.data )
                }
                return res.data;
            }
            else {
                return Promise.reject(res)
            }
        })
    }
}


/**
 * 验证图形验证码 (popup 默认是false不弹出)
 * @param inputParams
 * @param popup
 * @returns {function()}
 */
export function verifyCaptchaAction(inputParams, popup = false) {
    return (dispatch) => {

        return utils.mzoneFetch(api.captchaVerify, inputParams)
            .then(function (res) {

                if (res.resultCode === Enum.API_SUCCESS_CODE) {
                    dispatch({
                        type: CAPTCHA_TOKEN,
                        payload: res.data
                    })
                } else {
                    popup && Popup('验证码输入错误');
                    dispatch({
                        type: CAPTCHA_TOKEN,
                        payload: null
                    })
                }

            })
    }
}

/*messageLoginYQBAction and  messageLoginWLTAction are almost the same
 * plz consider combine them*/
export function messageLoginYQBAction(inputParams, popup = false, successCallBack) {

    return (dispatch) => {
        return utils.getJSToken().then(function (result) {
            let params = Object.assign({
                jsResult: result.jsResult,
                jsToken: result.jsToken
            }, inputParams);
            return utils.mzoneFetch(api.smsLoginYQB, params)
                .then(function (result) {

                    if (result.resultCode == Enum.API_SUCCESS_CODE) {

                        persistLoginData(result, Enum.LOGIN_MODE.YQB);
                        dispatch({
                            type: SEND_LOGIN_SMS,
                            isLogin: true,
                            payload: result.data
                        });
                        dispatch({
                            type: LOGIN,
                            isLogin: true,
                            payload: result.data
                        });
                        successCallBack && successCallBack();
                        /* return data sample
                         binded:false
                         hasLoginPass:false
                         hasPayPass:false
                         nameAuthed:false
                         uid:   "881716753012101101"
                         userName  :  "18121257981"*/

                        if(result.data.binded){
                            return dispatch(exchangeWLTccessToken(result.data.sessionId)).then(()=> result.data)
                        }
                        return result.data;

                    } else {
                        popup && (result.resultCode !== Enum.API_UN_SIGUP) &&Popup(result.resultMsg);
                        return Promise.reject(result)
                    }
                });
        })
    }
}

export function messageLoginWLTAction(inputParams, popup = false) {


    return (dispatch) => {

        
        return utils.getJSToken().then(function (result) {
            let params = Object.assign({
                jsResult: result.jsResult,
                jsToken: result.jsToken
            }, inputParams);

            return utils.mzoneFetch(api.smsLoginWLT, params)
                .then(function (result) {

                   /* 测试用 测试时打开
                   return Promise.reject({data:{
                        binded:false
                        ,certType:"cscs"
                        ,hasLoginPass:false
                        ,hasPayPass:false
                        ,nameAuthed:false
                        ,wltTempToken:"37dcab48-8398-43d0-97d9-98d99ec7a195"
                    }
                        ,resultCode:"1052"
                        ,resultMsg:"需要验证证件号"
                        ,tn:"1134axrdq"})*/

                    if (result.resultCode === Enum.API_SUCCESS_CODE) {
                        persistLoginData(result, Enum.LOGIN_MODE.WLT);
                        dispatch({
                            type: SEND_LOGIN_SMS,
                            isLogin: true,
                            payload: result.data
                        });
                        dispatch({
                            type: LOGIN,
                            isLogin: true,
                            payload: result.data
                        });
                        if(result.data.binded){
                            return dispatch(exchangeWLTccessToken(result.data.sessionId)).then(()=> result.data )
                        }
                        return result.data;
                    } else {

                        popup && result.resultMsg
                            && (result.resultMsg.indexOf('需要验证证件号') == -1)
                            && (result.resultCode != Enum.WLT_API_SIGN_UP)
                            &&Popup(result.resultMsg);

                        // h5的需要 wlt 短信登录跳转, 需要 persist data (不会影响pc， popup是true）
                        popup && (result.resultMsg.indexOf('需要验证证件号') !== -1 )&& persistLoginData(result, Enum.LOGIN_MODE.WLT);

                        sessionCache.put(Enum.SESSION_KEY_LOGIN_MODE, Enum.LOGIN_MODE.WLT);
                        dispatch({
                            type: SEND_LOGIN_SMS,
                            payload: false
                        });
                        return Promise.reject(result)
                    }
                })
        })
    }
}


export function certLoginWLTAction(inputParams) {
    return (dispatch) => {
        return utils.getJSToken().then(function (result) {
            let params = Object.assign({
                jsResult: result.jsResult,
                jsToken: result.jsToken
            }, inputParams);
            return utils.mzoneFetch(api.certLoginWLT, params)
                .then(function (result) {

                    if (result.resultCode === Enum.API_SUCCESS_CODE) {
                        persistLoginData(result, Enum.LOGIN_MODE.WLT);
                        dispatch({
                            type: PASSWORD_LOGIN,
                            payload: result.data
                        });
                        dispatch({
                            type: LOGIN,
                            isLogin: true,
                            payload: result.data
                        });
                        if(result.data.binded){
                            return dispatch(exchangeWLTccessToken(result.data.sessionId)).then(()=> result.data )
                        }
                        return result.data;
                    } else {
                        dispatch({
                            type: PASSWORD_LOGIN,
                            payload: false
                        });
                        return Promise.reject(result.resultMsg)
                    }
                })
        })
    }
}

export function logout() {

    return (dispatch) => {
        return utils.mzoneFetch(api.logout).then(res=>{
            if(!res)res = {resultCode:Enum.API_SUCCESS_CODE}
            eraseLoginData();
            clearLoginData();
            dispatch({
                type: LOGOUT
            });
            if (res.resultCode === Enum.API_SUCCESS_CODE) {
                return res.data;
            }else{
                return Promise.reject(res.resultMsg)
            }

        }).catch(error=>{
            console.log(error)
            eraseLoginData();
            clearLoginData();
            dispatch({
                type: LOGOUT
            });
            return Promise.reject("服务不可用")
        })
    }

}

export function sendLoginSms(phoneNumber) {
    return () => {
        return utils.getJSToken().then(function (result) {
            let inputParams = {
                mp: phoneNumber,
                businessId: 'APPSMSDL2',
                jsResult: result.jsResult,
                jsToken: result.jsToken
            };

            return utils.mzoneFetch(api.sendLoginSms, inputParams)
                .then(function (result) {
                    if (result.resultCode === Enum.API_SUCCESS_CODE) {
                        /* data sample
                         binded:false
                         hasLoginPass:false
                         hasPayPass:false
                         nameAuthed:false
                         uid:   "881716753012101101"
                         userName  :  "18121257981"*/
                        return result.data;
                    } else {
                        //返回错误信息
                        return Promise.reject(result.resultMsg)
                    }
                });
        })
    }

}

/**
 * 获取公钥
 * @returns {function()}
 */
export function getEncryptKeys() {
    return utils.mzoneFetch(api.encryptKeys)
        .then(function (result) {

            if (result.resultCode === Enum.API_SUCCESS_CODE)
                return result.data;
            else
                return Promise.reject(null);
        })
}


/*忘记密码校验接口
 * plz consider combine them*/
export function verifyLoginpassOtp(inputParams, popup = false, successCallBack, showErrorMessage, callObj) {

    return (dispatch) => {
        return utils.getJSToken().then(function () {
            let params = {
                phoneNum: inputParams.phoneNum,
                smsCode: inputParams.smsCode,
                loginName: inputParams.phoneNum
            };
            return utils.mzoneFetch(api.verifyLoginpassOtp, params)
                .then(function (result) {
                    if (result.resultCode == Enum.API_SUCCESS_CODE) {
                        sessionCache.put('forgetpwdData', result.data);
                        dispatch({
                            type: PASSWORD_LOGIN,
                            isLogin: true,
                            payload: result.data
                        });
                        successCallBack && successCallBack(result.data.authRealName);
                        /* return data sample
                         binded:false
                         hasLoginPass:false
                         hasPayPass:false
                         nameAuthed:false
                         uid:   "881716753012101101"
                         userName  :  "18121257981"*/
                        return result.data;
                    } else {
                        showErrorMessage.call(callObj, result.resultMsg);
                    }
                });
        })
    }
}


/*证件号校验接口
 * plz consider combine them*/
export function identityNo(inputParams, popup = false, successCallBack, showErrorMessage, callObj) {

    return (dispatch) => {
        return utils.getJSToken().then(function () {
            return utils.mzoneFetch(api.identityNo, inputParams)
                .then(function (result) {
                    if (result.resultCode == Enum.API_SUCCESS_CODE) {
                        successCallBack && successCallBack(inputParams.identityNo,result.data.tempToken);
                    } else {
                        showErrorMessage.call(callObj, result.resultMsg);
                    }
                });
        })
    }
}

/*登录时如果想要 跳转到某个特定地址请用次方法配置  url 支持全路径或者 #hash*/
export function addLogoutToUrl(url){
    return  (dispatch) => {
        dispatch({
            type:LOGOUT2URL,
            data:url
        })
    }
}

/*MZONE登录态换取壹钱包accessToken*/
export function exchangeYQBAccessToken(mzone_token){
    return  (dispatch) => {

    }
}


///*登录态换取wlt h5 Tokenf(双向bind的用户可用)*/
//let tokenVerMap={"pc":api.exchangeWLTToken4PC,"h5":api.exchangeWLTToken};

/**
 * 统一使用单向绑定的接口， 不会出现1213的单向绑定换取登录态的错误提示
 * @param mzone_token
 * @param tokenVer
 * @returns {function(*)}
 */
export function exchangeWLTccessToken(mzone_token,tokenVer ="h5"){
    return  (dispatch) => {
        //let reqUrl = tokenVerMap[tokenVer]||api.exchangeWLTToken;
        return utils.mzoneFetch(api.exchangeWLTTokenUni).then(function (result) {
            if (result.resultCode == Enum.API_SUCCESS_CODE) {
                localCache.put(Enum.SESSION_KEY_WLT_TOKEN,{token:result.data.token})

                return result.data;
            } else {
                if (result.resultCode == Enum.API_BINDERROR1||result.resultCode == Enum.API_BINDERROR2) {
                    //eraseLoginData();

                    dispatch({
                        type: GET_CAPTCHA,
                        payload: 'resetCaptcha'
                    })

                    dispatch(getCaptchaAction());
                    dispatch(logout());

                }
                return Promise.reject(result)
            }
        });
    }
}

/*
 * 壹钱包用户信息查询
 * */
export function requestYqbUserInfoData (token, loginMode, h5SaveLoginModeCookie) {
    return (dispatch, getState) => {
        return utils.mzoneFetch(`${api.yqbUserInfoQuery}?m=${token||""}` , {}, {}).then(function(result) {
            if (result.resultCode == Enum.API_SUCCESS_CODE) {
                persistLoginData(result, loginMode||"", h5SaveLoginModeCookie);
                dispatch({
                    type: LOGIN,
                    isLogin: true,
                    payload: result.data
                });
                if(result.data.binded){
                    return dispatch(exchangeWLTccessToken(result.data.sessionId)).then(()=> result.data )
                }
                return result.data;
            } else {
                return Promise.reject(result.resultMsg)
            }
        });
    }
}

/*判断能否去 “我的”页面 返回结果
* */
export function isAbleToGotoMinePage(){
     /*yqb用户可以， 万里通用户必须要绑定*/
    let usercache = getLoginDataFromCache();
    if(usercache.isLogin()){
        if(Enum.LOGIN_MODE.YQB==sessionCache.get(Enum.SESSION_KEY_LOGIN_MODE)){
            return true
        }
        if(usercache.getUserInfo()&&usercache.getUserInfo().binded)return true;
        return false;
    }
    return false
}

export function generateToBindUrlWithProvidedReturnUrl(returnUrl){
    let loginMode = sessionCache.get(Enum.SESSION_KEY_LOGIN_MODE);
    return `/account#/${Enum.SESSION_VALUE_PAGE_BIND}?binded=${loginMode}&returnUrl=${encodeURIComponent(returnUrl||"")}`
};