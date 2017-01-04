/**
 * Created by zhiyong on 16/10/26.
 */
/**
 * 通过时间过滤数据
 * @param arr
 */
function filterDataByTime(arr) {
    var tempArray = [];
    if(arr){
        const now = new Date();
        for(let i=0,len=arr.length;i<len;i++){
            if ((now >= arr[i].startTime && now <= arr[i].endTime) || ((arr[i].endTime==null && now >= arr[i].startTime) || ( arr[i].endTime == "undefined"&& now >= arr[i].startTime) )) {
                tempArray.push(arr[i]);
            }
        }
    }
    return tempArray;
}
/**
 * 通过位置过滤数据
 * @param arr
 */
function filterDataByPosition(arr) {
    if(arr){
        arr.sort(function (a, b) {
            return a.position - b.position
        });
    }
    return  arr;
}

/**
 * 通过ID过滤数据
 * @param arr
 */
function filterDataById(arr) {
    if(arr){
        arr.sort(function (a, b) {
            return a.id - b.id
        });
    }
    return  arr;
}
export default {filterDataByTime, filterDataByPosition,filterDataById};