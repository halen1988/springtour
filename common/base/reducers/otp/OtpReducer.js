/**
 * Created by chenxuqi on 10/24/16.
 */
import {SEND_SMS, SEND_REGISTER_SMS, SEND_LOGIN_SMS} from "../../constants/ActionType";

let defautlState = {

};

export default function otp(state = defautlState, action) {
    switch (action.type) {
        case SEND_SMS:
            return Object.assign({}, state, {
                smsData: action.payload
            });
        case SEND_REGISTER_SMS:
            return Object.assign({}, state, {
                registerSmsData: action.payload
            });
        case SEND_LOGIN_SMS:
            return Object.assign({}, state, {
                loginSmsData: action.payload,
                isLogin:!!action.payload&&(typeof action.payload!=="string")
            });
        default:
            return state;
    }
}


export function getOtpData(state) {
    return state.otp
}





