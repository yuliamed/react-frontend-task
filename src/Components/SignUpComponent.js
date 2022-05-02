import React from 'react';
import { Form, Input, Button } from 'antd';

import FormItemLabel from "antd/lib/form/FormItemLabel";
function SignUpComponent() {

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off">

            <Form.Item>
                <FormItemLabel label="Sign Up"></FormItemLabel>
            </Form.Item>

            <Form.Item>
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item>
                <Input placeholder="Surname" />
            </Form.Item>

            <Form.Item rules={[{ type: 'email', required: true, message: "imput valid email!" }]}>
                <Input placeholder="email" /*onChange={e => this.setState({ ...this.state, email: e.target.value })}*/ />
            </Form.Item>

            <Form.Item rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder="pass" /* onChange={e => this.setState({ ...this.state, pass: e.target.value })} */ />
            </Form.Item>

            <Form.Item
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder="confirm pass" /* onChange={e => this.setState({ ...this.state, pass: e.target.value })} */ />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" shape='round'>
                    Sign up
                </Button>
            </Form.Item>
        </Form>
    )

}

export default SignUpComponent