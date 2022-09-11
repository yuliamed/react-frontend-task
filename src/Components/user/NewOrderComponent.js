import React, { Component } from 'react';
import Header from "../common/headers/Header";
import { Button, Row, Col } from "antd";

class NewOrderComponent extends Component {
    render() {
        return (
            <div>
                <Header />
                <Row style={{
                    marginTop: "20px",
                    marginBottom: "50px"
                }
                }>
                    <Col span={12}>
                        <Button
                            type="primary"
                            onClick={(e) => this.onCreateNewInspectionOrder(e)}>
                            Create inspection order
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            type="primary"
                            onClick={(e) => this.onCreateNewSelectionOrder(e)}>
                            Create selection order
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NewOrderComponent;
