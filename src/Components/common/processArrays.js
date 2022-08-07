export function createOptionArr(arr) {
    const children = [];

    for (let i = 0; i < arr.length; i++) {
        children.push(<Option key={arr[i]}>{arr[i]}</Option>);
    }
    return children
}

export function getArrByNames(inputArr) {
    let arr = [];
    Object.values(inputArr).forEach(function (entry) {
        arr.push(entry.name)
    })
    return arr;
}

export function createArrWithName(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        let obj = {
            name: arr[i]
        }
        newArr.push(obj)
    }
    return newArr;
}

export function createOptionArrWithIdsKey(arr) {
    const children = [];

    for (let i = 0; i < arr.length; i++) {
        children.push(<Option key={arr[i].id}>{arr[i].name}</Option>);
    }
    return children
}