/**
 * Created by chenxuqi on 10/24/16.
 */
import {
    SEND_SMS, SEND_REGISTER_SMS, SEND_LOGIN_SMS, GET_CAPTCHA, GET_JS_QUERY, CAPTCHA_TOKEN
}
    from "../../constants/ActionType";
import utils from "../../utils/utils";
import {sessionCache} from "../../utils/cache";
import * as Enum from '../../constants/Enum';

import api from '../../configs/api';



/**
 * [sendSmsAction 通用短信发送]
 * @param  {[obj]} params [入参]
 *       {
 *           jsResult:'',               //js函数结果
 *           jsToken:'',                //js token
 *           captchaToken:'',           //图形验证码token
 *           mp:'',                     //手机号
 *           businessId:''              //业务ID {短信登录：APPSMSDL2, 注册会员：APPYHZDZC2, 支万修改手机号:APPWLTXGSJH, MGM/万里通引流/积分联盟活动: H5JFLMLKQ}
 *       }
 * @return {[type]}   [description]
 */

export function sendSmsAction(params) {
    return (dispatch, getState) => {
        return utils.getJSToken().then(function (result) {
            let inputParams = {
                mp: params.mp,
                businessId: params.businessId,
                jsResult: result.jsResult,
                jsToken: result.jsToken,
                captchaToken: params.captchaToken
            };
            return utils.mzoneFetch(api.sendSms, inputParams)
                .then(function (result) {
                    console.log(result);
                    if (result.resultCode === Enum.API_SUCCESS_CODE) {
                        // sessionCache.put(Enum.SESSION_KEY_LOGIN_DATA, result.data);
                        dispatch({
                            type: SEND_SMS,
                            payload: result.data
                        });
                        return result.data
                    } else {
                        dispatch({
                            type: SEND_SMS,
                            payload: result.data
                        });
                        return Promise.reject(result)
                    }

                });
        })
    }
}
/**
 * [sendRegisterSmsAction 壹钱包获取注册短信OTP]
 * @param  {[obj]} params [入参]
 *       {
 *           jsResult:'',               //js函数结果
 *           jsToken:'',                //js token
 *           captchaToken:'',           //图形验证码token
 *           mp:'',                     //手机号
 *           businessId:''              //业务ID {短信登录：APPSMSDL2, 注册会员：APPYHZDZC2, 支万修改手机号:APPWLTXGSJH, MGM/万里通引流/积分联盟活动: H5JFLMLKQ}
 *       }
 * @return {[type]}   [description]
 */



export function sendRegisterSmsAction(params) {
    return (dispatch, getState) => {
        return utils.getJSToken().then(function (result) {
            let inputParams = {
                mp: params.mp,
                businessId: 'APPYHZDZC2',
                jsResult: result.jsResult,
                jsToken: result.jsToken,
                captchaToken: params.captchaToken
            };
            return utils.mzoneFetch(api.sendRegisterSms, inputParams)
                .then(function (result) {
                    // console.log(result);
                    if (result.resultCode === Enum.API_SUCCESS_CODE) {
                        dispatch({
                            type: SEND_REGISTER_SMS,
                            payload: result.data
                        })
                        return result.data
                    } else {
                        dispatch({
                            type: SEND_REGISTER_SMS,
                            payload: result.data
                        });
                        return Promise.reject(result)
                    }

                });
        })
    }
}

/**
 * [sendLoginSms 壹钱包获取登陆短信OTP]
 * @param  {[obj]} params [入参]
 *       {
 *           jsResult:'',               //js函数结果
 *           jsToken:'',                //js token
 *           captchaToken:'',           //图形验证码token
 *           mp:'',                     //手机号
 *           businessId:''              //业务ID {短信登录：APPSMSDL2, 注册会员：APPYHZDZC2, 支万修改手机号:APPWLTXGSJH, MGM/万里通引流/积分联盟活动: H5JFLMLKQ}
 *       }
 * @return {[type]}   [description]
 */
export function sendLoginSms(params) {

    return (dispatch, getState) => {
        return utils.getJSToken().then(function (result) {
            let inputParams = {
                mp: params.mp,
                businessId: params.businessId||'APPSMSDL2',
                jsResult: result.jsResult,
                jsToken: result.jsToken,
                captchaToken: params.captchaToken
            };
            return utils.mzoneFetch(api.sendLoginSms, inputParams)
                .then(function (result) {
                    // console.log(result);
                    if (result.resultCode === Enum.API_SUCCESS_CODE) {
                        dispatch({
                            type: SEND_LOGIN_SMS,
                            payload: {nameAuthed : result.data.nameAuthed}
                        });
                        return result.data;
                    } else {
                        dispatch({
                            type: SEND_LOGIN_SMS,
                            payload: result.data
                        });
                        return Promise.reject(result)
                    }
                });
        })
    }
}




export function clearSmsLoginData() {

    return (dispatch)=> {
        dispatch({
            type: SEND_LOGIN_SMS,
            payload: ''
        });
    }
}

