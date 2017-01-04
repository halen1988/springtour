/**
 * Created by CHENXUQI876 on 2016/12/8.
 */
import { GETACCESSTOKEN, GETWLTTOKEN, GETWLTPCTOKEN } from "../../constants/ActionType";


export default function token(state = {}, action) {
    switch (action.type) {
        case GETACCESSTOKEN:
            return Object.assign({}, state, {
                smsData: action.payload
            });
        case GETWLTTOKEN:
            return Object.assign({}, state, {
                registerSmsData: action.payload
            });
        case GETWLTPCTOKEN:
            return Object.assign({}, state, {
                loginSmsData: action.payload,
                isLogin:action.payload
            });
        default:
            return state;
    }
}


export function getToken(state) {
    return state.token
}