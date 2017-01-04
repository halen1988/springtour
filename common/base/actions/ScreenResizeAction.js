/**
 * Created by: 史元君
 Desc:
 */

import {SCREEN_RESIZZE} from "../constants/ActionType";

export default function({height,width}){
    return {
        type:SCREEN_RESIZZE,
        height,
        width
    }
}