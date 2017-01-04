/**
 *author zhiyong
 *date  04/11/2016
 */
var data2H5 = (str, insertStr="-pad") => {
    var temp = str.split('.');
    var resultStr='';
    for(var i=0; i<temp.length;i++){
        if(i==0){
            resultStr =temp[i]
        }else if(i>0 && i<temp.length-1){
            resultStr =resultStr + '.' + temp[i]
        }else if(i == temp.length-1) {
            resultStr =resultStr + insertStr + '.'+ temp[i]
        }
    }
    return resultStr
}


function completeUrl(data, url, str = 'imgSrc', isH5 = false) {
    if(!url.match(/\/$/)){
        url += '/';
    }
    var a = 0;
    for (var item in data) {
        if (data[item] && data[item][str]) {
            if (isH5) {
                data[item][str] = url + data2H5(data[item][str]);
            } else {
                data[item][str] = url + data[item][str];
            }
        }
        for (var item1 in data[item]) {
            if (data[item][item1] && data[item][item1][str]) {
                if (isH5) {
                    data[item][item1][str] = url + data2H5(data[item][item1][str]);
                } else {
                    data[item][item1][str] = url + data[item][item1][str];
                }
            }
            for (var item2 in data[item][item1]) {
                if (data[item][item1][item2] && data[item][item1][item2][str]) {
                    if (isH5) {
                        data[item][item1][item2][str] = url + data2H5(data[item][item1][item2][str]);
                    } else {
                        data[item][item1][item2][str] = url + data[item][item1][item2][str];
                    }

                }
                for (var item3 in data[item][item1][item2]) {
                    if (data[item][item1][item2][item3] && data[item][item1][item2][item3][str]) {
                        if (isH5) {
                            data[item][item1][item2][item3][str] = url + data2H5(data[item][item1][item2][item3][str]);
                        } else {
                            data[item][item1][item2][item3][str] = url + data[item][item1][item2][item3][str];
                        }
                    }
                }
            }
        }
    }
    return data;
}

function completePad(data, str = 'imgSrc', plusStr='-pad') {
    var a = 0;
    for (var item in data) {
        if (data[item] && data[item][str]) {
            data2H5(data[item][str],plusStr);
        }
        for (var item1 in data[item]) {
            if (data[item][item1] && data[item][item1][str]) {
                data[item][item1][str] = data2H5(data[item][item1][str],plusStr);
            }
            for (var item2 in data[item][item1]) {
                if (data[item][item1][item2] && data[item][item1][item2][str]) {
                    data[item][item1][item2][str] =  data2H5(data[item][item1][item2][str],plusStr);
                }
                for (var item3 in data[item][item1][item2]) {
                    if (data[item][item1][item2][item3] && data[item][item1][item2][item3][str]) {
                        data[item][item1][item2][item3][str] = data2H5(data[item][item1][item2][item3][str],plusStr);
                    }
                }
            }
        }
    }
    return data;
}

export {completePad};

export default completeUrl;