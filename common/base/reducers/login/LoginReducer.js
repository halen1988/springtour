/**
 * Created by Sean on 10/9/16.
 */
import {PASSWORD_LOGIN,LOGOUT,GET_CAPTCHA,GET_JS_QUERY, CAPTCHA_TOKEN,LOGIN,LOGOUT2URL}
    from "../../constants/ActionType";

let defautlState = {
    isLogin: false,
    loginData:{},
    passwordLoginData: false,
    captchaToken: {},
    captchaData: '',
    logoutURL:""
};

export default function login(state = defautlState, action) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                loginData: action.payload,
                isLogin:!!action.payload&&(typeof action.payload!=="string")
            });
        case PASSWORD_LOGIN:
            return Object.assign({}, state, {
                passwordLoginData: action.payload,
                isLogin:!!action.payload&&(typeof action.payload!=="string")
            });
        case GET_CAPTCHA:
            return Object.assign({}, state, {
                captchaData: action.payload
            });
        case GET_JS_QUERY:
            return Object.assign({}, state, {
                jsQuery: action.payload
            });
        case CAPTCHA_TOKEN:
            return Object.assign({}, state, {
                captchaToken: action.payload
            });
        case LOGOUT:
            return  Object.assign({}, state, {
                isLogin: false,
                loginData:{},
                passwordLoginData:{}
            });
        case LOGOUT2URL:
            return  Object.assign({}, state, {
                logoutURL:action.data
            });
        default:
            return state;
    }
}


export function getLogoutUrl(state){
    return state.login.logoutURL
}



export function getLoginData(state) {
    return state.login
}

let returnedObj={
    data:{},
    setData(data){
        this.data =data;
        return this;
    },
    isLogin(){
        return this.data.isLogin;
    },
    getUserInfo(){
        return this.data.loginData;
    },
    getCaptchaToken(){
        return this.data.captchaToken&&this.data.captchaToken.token;
    }
};

export function getLoginUtils(state) {
    let data = getLoginData(state);

    return returnedObj.setData(data)
}




