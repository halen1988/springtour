/**
 * Created by Sean on 10/10/16.
 */
import * as Type from "../../constants/ActionType";
import utils from "../../utils/utils";
import api from '../../configs/api';
import {Popup} from '../../components/popup/popup';


export function SetupLoginPassAction(inputParams, popup = false) {
    return (dispatch) => {
        return utils.mzoneFetch(api.setLoginPwd, inputParams, {method: 'POST'})
            .then(function (result) {
                /*  sample return  data
                 resultCode "1000"
                 resultMsg 操作成功"
                 tn "113w6sk"*/
                if (result.resultCode === '1000') {
                    dispatch({
                        type: Type.SETUP_PASSWORD,
                        payload: {isPassed: true}
                    });
                    //no return data
                    return result;
                } else {
                    popup && Popup(result.resultMsg);
                    return Promise.reject(result.resultMsg)
                }
            });
    }
}







