import React, { Component } from 'react';
import { Card, Tag } from 'antd';
import { ORDER_STATUSES } from '../../../constants/const';

class MainInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creationDate: props.creationDate,
            status: props.status,
            autoPicker: props.autoPicker,
        };
        this.getTagColor = this.getTagColor.bind(this);
    }
    getTagColor(statusName) {
        switch (statusName) {
            case ORDER_STATUSES.CANCELED: return "red";
            case ORDER_STATUSES.CLOSED: return "blue";
            case ORDER_STATUSES.CREATED: return "gold";
            case ORDER_STATUSES.IN_PROCESS: return "cyan";
        }
    }
    render() {
        return (
            <Card title="Main data" size="small">
                <p><b>Date of order: </b>{this.state.creationDate.substr(0, 10)} </p>
                <p><b>Status of order: </b><Tag color={this.getTagColor(this.state.status.name)}>{this.state.status.name}</Tag > </p>
                <p><b>Auto-picker: </b> {this.state.autoPicker == null ? <Tag color="magenta">does not set yet </Tag>: 
                <Tag >this.state.autoPicker.name</Tag>}</p>
            </Card>
        );
    }
}

export default MainInfoComponent;
