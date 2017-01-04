/**
 *author zhiyong
 *date  16/10/12
 */
import {CHANGE_TOPIC_ACTION} from "../constants/ActionType.js"

export default (state = {}, action)=> {
    switch (action.type){
        case CHANGE_TOPIC_ACTION:
            return Object.assign({}, state, action.data);
        default:
            return state
    }

}

export function getChangeTopic(state) {
    return state.changeTopic
}