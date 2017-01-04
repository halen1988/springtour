/**
 * Created by CHENXUQI876 on 2016/12/8.
 */
import { GETACCESSTOKEN, GETWLTTOKEN, GETWLTPCTOKEN } from "../../constants/ActionType";
import utils from "../../utils/utils";
import {sessionCache} from "../../utils/cache";
import * as Enum from '../../constants/Enum';

import api from '../../configs/api';



export function getAccessToken(params) {
    return (dispatch, getState) => {
        return utils.mzoneFetch(api.getAccessToken, params)
            .then(function (result) {
                console.log(result);
                if (result.resultCode === Enum.API_SUCCESS_CODE) {
                    // sessionCache.put(Enum.SESSION_KEY_LOGIN_DATA, result.data);
                    dispatch({
                        type: GETACCESSTOKEN,
                        payload: result.data
                    });
                    return result.data
                } else {
                    return Promise.reject(result)
                }

            });
    }
}
export function getWltToken(params) {
    return (dispatch, getState) => {
        return utils.mzoneFetch(api.getWltToke, params)
            .then(function (result) {
                console.log(result);
                if (result.resultCode === Enum.API_SUCCESS_CODE) {
                    // sessionCache.put(Enum.SESSION_KEY_LOGIN_DATA, result.data);
                    dispatch({
                        type: GETWLTTOKEN,
                        payload: result.data
                    });
                    return result.data
                } else {
                    return Promise.reject(result)
                }
            });
    }
}
export function getWltPcToken(params) {
    return (dispatch, getState) => {
        return utils.mzoneFetch(api.getWltPcToken, params)
            .then(function (result) {
                console.log(result);
                if (result.resultCode === Enum.API_SUCCESS_CODE) {
                    // sessionCache.put(Enum.SESSION_KEY_LOGIN_DATA, result.data);
                    dispatch({
                        type: GETWLTPCTOKEN,
                        payload: result.data
                    });
                    return result.data
                } else {
                    return Promise.reject(result)
                }
            });
    }
}