/**
 * Created by Sean on 10/14/16.
 */
import * as Type from "../../constants/ActionType";
import utils from "../../utils/utils";
import api from '../../configs/api';
import {Popup} from '../../components/popup/popup';


export function SetupPayPassAction(inputParams, popup=false) {
    return (dispatch) => {
        return utils.mzoneFetch(api.setPayPwd,inputParams, {method: 'POST'})
            .then(function(result) {
                if(result.resultCode === '1000'){
                    dispatch({
                        type: Type.SETUP_PAY_PASSWORD,
                        payload: {isPassed: true}
                    });
                    return result.data;
                }else{
                    popup && Popup(result.resultMsg);
                    return Promise.reject(result.resultMsg)
                }
            });
    }
}
