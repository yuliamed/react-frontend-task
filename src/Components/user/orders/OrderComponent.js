import React, { Component } from 'react';
import { Button, Card} from 'antd';
import {FormOutlined } from '@ant-design/icons';
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
        return (
            <>
                <Card style={{
                    width: "800px"
                }} align="start" title={title}
                    extra={<Button shape='round' type="primary"  onClick={
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
