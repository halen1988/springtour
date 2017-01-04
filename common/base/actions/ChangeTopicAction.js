/**
 * Created by: 史元君
 Desc:
 */
/*
 * 接受楼层列表数据action
 * */
import {CHANGE_TOPIC_ACTION} from "../constants/ActionType"

export default function changeTopicAction (data) {
    return {
        type:  CHANGE_TOPIC_ACTION,
        data
    }
}