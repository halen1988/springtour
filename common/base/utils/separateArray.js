/**
 * Created by zhiyong on 16/11/22.
 */
function separateArray(arr, count) {
    if(arr.length <= count){
        return [arr]
    }
    let result = [];
    var flag;
    for (flag = 0; flag < arr.length; flag += count) {
        var temp = arr.slice(flag, flag + count)
        result.push(temp);
    }
    return result
}

export  {separateArray};