/**
 * Created by: 史元君
 Desc:
 */

import {SCREEN_RESIZZE} from "../constants/ActionType";

let minHeight = 700;

export default (state = {height: minHeight}, action)=> {
    switch (action.type) {
        case SCREEN_RESIZZE:
            return {height: Math.max(minHeight,action.height),width:action.width};
        default :
            return state;
    }
}

export function getScreenSize(state){
    return state.screenResize;
}