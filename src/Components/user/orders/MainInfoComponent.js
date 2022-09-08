import React, { Component } from 'react';
import { Card } from 'antd';
class MainInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creationDate: props.creationDate,
            status: props.status,
            autoPicker: props.autoPicker,
        };
        //thisObj = this;
    }
    render() {
        return (
            <Card title="Main data" size="small">
                <p><b>Date of order: </b>{this.state.creationDate.substr(0, 10)} </p>
                <p><b>Status of order: </b>{this.state.status.name}</p>
                <p><b>Auto-picker: </b> {this.state.autoPicker == null ? "does not set yet" : this.state.autoPicker.name}</p>
            </Card>
        );
    }
}

export default MainInfoComponent;
