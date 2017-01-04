/**
 * Created by chenxuqi on 10/25/16.
 */
import {GET_BIND_OPTION, BIND} from "../../constants/ActionType";

let defautlState = {

};

export default function bind(state = defautlState, action) {
    switch (action.type) {
        case GET_BIND_OPTION:
            return Object.assign({}, state, {
                bindOption: action.payload
            });
        case BIND:
            return Object.assign({}, state, {
                bindResult: !!action.payload
            });
        default:
            return state;
    }
}

export function getBindData(state) {
    return state.bind
}





