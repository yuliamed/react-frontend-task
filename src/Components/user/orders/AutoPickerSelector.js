import React, { Component } from 'react';
import { Select } from 'antd';
const { Option } = Select;
let thisObj;
class AutoPickerSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      array: this.props.array,
    };
    this.onSelect = this.props.getSelectedAutoPicker;
    this.createOptionArrForAutoPickers = this.createOptionArrForAutoPickers.bind();
    thisObj = this;
  }

  createOptionArrForAutoPickers(arr) {
    const children = [];
    console.log("gbpltw");
    if (arr != null)
      for (let i = 0; i < arr.length; i++) {
        children.push(<Option key={arr[i].id}>{arr[i].name + " " + arr[i].surname}</Option>);
      }
    return children
  }

  render() {
    console.log("object");
    return (
      <Select
        allowClear
        placeholder="Please select"
        onSelect={(value) => {
          console.log(value)
          this.onSelect(value);
        }}
      >
        {this.createOptionArrForAutoPickers(this.props.array)}
      </Select>
    );
  }
}

export default AutoPickerSelector;
