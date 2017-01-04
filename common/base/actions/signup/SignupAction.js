/**
 * Created by HUZUDE355 on 2016/10/11.
 */
import utils from "../../utils/utils";
import {sessionCache,localCache} from "../../utils/cache";
import * as Type from "../../constants/ActionType";
import api from '../../configs/api';
import * as Enum from '../../constants/Enum';

function persistLoginData(data, loginMode) {
    sessionCache.put(Enum.SESSION_KEY_LOGIN_DATA, data);
    sessionCache.put(Enum.SESSION_KEY_LOGIN_MODE, loginMode);
    localCache.put(Enum.SESSION_KEY_LOGIN_MODE, loginMode);
}


export function signup(inputParams,successCallback,failCallback,callObj) {
    return (dispatch, getState) => {
        return utils.mzoneFetch(api.signup, inputParams, {method: 'POST'})
            .then(function (result) {
                if (result.resultCode == '1000'){
                    let key = Enum.SESSION_KEY_MZONE_SESSION_ID;
                    // mzone_token,存入session
                    result.data && sessionCache.put(key, result.data.sessionId);
                    // 存入signup步骤,用于标记当前正处于第几步，防止用户直接从URL跳转
                    sessionCache.put(Enum.SESSION_KEY_SIGNUP_STEP, "2");

                    // 注册完成需要自动登陆
                    persistLoginData(result.data, Enum.LOGIN_MODE.YQB)
                    // dispatch({
                    //     type: Type.PASSWORD_LOGIN,
                    //     isLogin: true,
                    //     payload: result.data
                    // });
                    // dispatch({
                    //     type: Type.LOGIN,
                    //     isLogin: true,
                    //     payload: result.data
                    // });

                    successCallback(result.data.binded,result.data.sessionId);
                }else{
                    failCallback.call(callObj,result.resultMsg,result.resultCode);
                }
            });
    }
}

export function sendSignupSms(phoneNumber) {
    return (dispatch, getState) => {
        utils.getJSToken().then(function (result) {
            let inputParams = {
                mp:phoneNumber,
                businessId:'APPYHZDZC2',
                jsResult:result.jsResult,
                jsToken:result.jsToken
            }
            return utils.mzoneFetch(api.sendSignupSms, inputParams)
                .then(function (result) {
                    console.log(result);
                });
        })
    }
}

//设置支付密码接口
export function setsecurity(realParams,successCallback,failCallback,callObj){
    return (dispatch, getState) => {
        let realName = api.setrealname+'?m='+sessionCache.get(Enum.SESSION_KEY_MZONE_SESSION_ID);
        console.log(realName);
        return utils.mzoneFetch(realName, realParams, {method: 'POST'})
            .then(function (result) {
                console.log(result);
                if (result.resultCode == '1000'){
                    sessionCache.put(Enum.SESSION_KEY_SIGNUP_STEP, "3");
                    successCallback(realParams.binded);
                }else{
                    failCallback.call(callObj,result.resultMsg,result.resultCode);
                }
            });
    };
}

//设置登录密码接口
export function setpassword(setpasswordjson,callbacksuccess,showErrorMessage,callObj){
    return (dispatch, getState) => {
        return utils.mzoneFetch(api.setPwdPwd, setpasswordjson, {method: 'POST'})
            .then(function (result) {

                if(result.resultCode == '1000'){
                    callbacksuccess();
                }else{
                    showErrorMessage.call(callObj,result.resultMsg);
                }

            });
    };
}
