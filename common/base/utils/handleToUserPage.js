/**
 * 对common中工具进行扩展
 **/

import {sessionCache} from "./cache";
import * as Enum from '../constants/Enum';
import { isAbleToGotoMinePage,generateToBindUrlWithProvidedReturnUrl} from "../actions/login/LoginAction"
/*
 * 处理跳转我的页面, 默认跳我的
 * */
const handleToUserPage = function (hash){
    hash = hash || 'mine';
    let loginData = sessionCache.get(Enum.SESSION_KEY_LOGIN_DATA),
        loginMode = sessionCache.get(Enum.SESSION_KEY_LOGIN_MODE);
    if(loginData && !loginData.binded && loginMode == Enum.LOGIN_MODE.WLT){
        window.location.href = window.location.origin + '/account/#/bind?binded=wlt&&returnUrl=' + decodeURIComponent(window.location.href + hash);
    }
    else{
        window.location.href = '/#/'+hash;
    }
}

export function toMine(){
    let url ="/#/mine";
    if(!isAbleToGotoMinePage()){
        url = generateToBindUrlWithProvidedReturnUrl(url)
    }
    window.location.href = url;
};



export default handleToUserPage;
