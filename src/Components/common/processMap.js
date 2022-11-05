import { Tag, Select } from 'antd';
const { Option } = Select;

export function getKey(map, value) {
  const arr = [...map].find((pair) => pair[1] == value);
  return arr ? arr[0] : null;
}

export function getTagListFromMap(baseMape, arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let rus_name = baseMape.get(arr[i].name);
    newArr.push(<Tag >{rus_name}</Tag>)
  }
  return newArr;
}

export function getTagFromMap(baseMape, value) {
  let newArr = <Tag >пусто</Tag>;

  let rus_name = baseMape.get(value);
  newArr = (<Tag >{rus_name}</Tag>)

  return newArr;
}

export function getColoredTagFromMap(baseMape, value, color) {
  let newArr = <Tag >пусто</Tag>;
  let rus_name = baseMape.get(value);
  newArr = (<Tag color={color}>{rus_name}</Tag>)
  return newArr;
}

export function getNamesListFromMap(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let rus_name = (arr[i].name);
    newArr.push(rus_name);
  }
  return newArr;
}

export function getNamedOptionListFromMap(baseMape) {
  let children = [];
  baseMape.forEach((value, key, map) => {
    children.push(<Option key={key}>{value}</Option>)
  })
  return children
}