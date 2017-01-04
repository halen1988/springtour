/**
 * Created by: 史元君
 Desc:
 */

import {UPDATE_ROUTE_PATH} from "../constants/ActionType";

export default (state = [], action)=> {
    switch (action.type) {
        case UPDATE_ROUTE_PATH:
            return [...action.data];
        default:
            return state;
    }
}

export function getRoutePath(state) {
    return state.routePath;
}