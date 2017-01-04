/**
 * Created by: 史元君
 Desc:
 */

import {UPDATE_ROUTE_PATH} from "../constants/ActionType";

export default function(data){
    return {
        type:UPDATE_ROUTE_PATH,
        data,
    }
}