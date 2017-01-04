/**
 * Created by Sean on 10/14/16.
 */
import {LOGIN, GET_BIND_OPTION, BIND} from "../../constants/ActionType";
import utils from "../../utils/utils";
import * as Enum from '../../constants/Enum';
import api from '../../configs/api';
import {sessionCache, localCache} from "../../utils/cache";
import {requestYqbUserInfoData} from "./LoginAction";

/**
 * [fetchBindType 获取用户绑定验证信息]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */



/*key 对应的str值必须是一个str化的obj才能更新属性值*/
function mergePersistData(key, propName,value) {
    let json = sessionCache.get(key)||{};
    json[propName] = value;
    sessionCache.put(key, json);
}


export function fetchBindType(params) {
    return (dispatch, getState) => {
        return utils.mzoneFetch(addTokenUrl(api.getBindOption), params, {method: 'post'})
            .then(function(res) {
                if(res.resultCode === Enum.API_SUCCESS_CODE){

                    dispatch({
                        type: GET_BIND_OPTION,
                        payload: res.data
                    });
                    // dispatch({
                    //     type: LOGIN,
                    //     isLogin: true,
                    //     payload: {userName:res.data.mp}
                    // });
                    return res.data;
                } else {
                    dispatch({
                        type: GET_BIND_OPTION,
                        payload: res.data
                    });
                    
                    return Promise.reject(res)
                }
            });
    }
}

/**
 * [bind 绑定操作]
 * @param  {[type]}
 *         {
 *             token：'',                //验证token   
 *             idInYqb:'',               //壹钱包证件号   
 *             idInWlt:'',               //万里通证件号   
 *             smsInYqb:'',              //壹钱包短信验证码 
 *             smsInWlt:''               //万里通短信验证码 
 *         }
 * @return {[type]}        [description]
 */
export function bind(params) {
    return (dispatch, getState) => {
        return utils.mzoneFetch(addTokenUrl(api.bind), params, {method: 'post'})
            .then(function(res) {
                let loginMode = sessionCache.get(Enum.SESSION_KEY_LOGIN_MODE)||localCache.get(Enum.SESSION_KEY_LOGIN_MODE);
                let isBind = false;
                if(res.resultCode === Enum.API_SUCCESS_CODE){
                    isBind = true;
                    dispatch({
                        type: BIND,
                        payload: res.data
                    })
                    dispatch(requestYqbUserInfoData(null,loginMode))
                    return dispatch(exchangeWLTccessToken()).then(()=> res.data,()=> res.data)
                    // return {isBind}
                } else{
                    dispatch({
                        type: BIND,
                        payload: ''
                    })
                    return Promise.reject(res)
                }
            });
    }
}

/*登录态换取wlt h5 Tokenf(双向bind的用户可用)*/
let tokenVerMap={"pc":api.exchangeWLTToken4PC,"h5":api.exchangeWLTToken};
export function exchangeWLTccessToken(mzone_token,tokenVer ="h5"){
    return  (dispatch) => {
        //let reqUrl = tokenVerMap[tokenVer]||api.exchangeWLTToken;
        let reqUrl = api.exchangeWLTTokenUni;
        return utils.mzoneFetch(addTokenUrl(reqUrl)).then(function (result) {
            if (result.resultCode == Enum.API_SUCCESS_CODE) {
                localCache.put(Enum.SESSION_KEY_WLT_TOKEN,{token:result.data.token})
                return result.data.token
            } else {
                return Promise.reject(result.resultMsg)
            }
        });
    }
}

export function sendCommonSms(phoneNumber) {
    return (dispatch, getState) => {
        utils.getJSToken().then(function (result) {
            let inputParams = {
                mp:phoneNumber,
                businessId:'APPYQBBDWLT',
                jsResult:result.jsResult,
                jsToken:result.jsToken
            }

            console.log(inputParams);
            return utils.mzoneFetch(api.sendLoginSms, inputParams)
                .then(function (result) {
                    console.log(result);
                });
        })
    }
}


function getToken(){
    return localCache.get(Enum.SESSION_KEY_MZONE_SESSION_ID);
}

function addTokenUrl(url){
    var m = getToken();
    if(m){
        return url + '?m=' + m;
    }
    else{
        return url;
    }
    return url;
}

