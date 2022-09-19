import React, { Component } from 'react';
import { Button, Card } from 'antd';
import { FormOutlined } from '@ant-design/icons';
class OrderComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    }
    this.onMoreInfo = props.onMoreInfo;
  }
  render() {
    let title = this.props.type == "selection" ? "Selection order" : "Inspection order"
    let headStyle = this.props.type == "selection" ? { backgroundColor: '#2b40f8', color: '#ffffff' } : { backgroundColor: '#7d2bf8', color: '#ffffff' }
    return (
      <>
        <Card headStyle={headStyle} 
        style={{
          width: "800px",
          backgroundColor: "#F8F9FB"
        }} align="start" title={title}
          extra={<Button shape='round' onClick={
            this.onMoreInfo
          }>
            <FormOutlined label='View order' title="View order" visible={false} /> View order</Button>}
        >{this.props.innerCard}
        </Card>
      </>
    );
  }
}

export default OrderComponent;
