import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import FormItemLabel from "antd/lib/form/FormItemLabel";

class LoginComponent extends React.Component {

    state = {
        email: "", pass: ""
    };

    render() {
        return (

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onSubmitCapture={this.onLogin}
                autoComplete="off">

                <Form.Item>
                    <FormItemLabel label="Welcomе!"></FormItemLabel>
                </Form.Item>

                <Form.Item rules={[{ type: 'email', required: true, message: "imput valid email!" }]}>
                    <Input placeholder="email" onChange={e => this.setState({ ...this.state, email: e.target.value })} />
                </Form.Item>

                <Form.Item
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password placeholder="pass" onChange={e => this.setState({ ...this.state, pass: e.target.value })} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Sign in
                    </Button>
                </Form.Item>
            </Form>

        );
    }
}

export default LoginComponent