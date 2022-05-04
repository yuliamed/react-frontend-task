import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import FormItemLabel from "antd/lib/form/FormItemLabel";
import {connect} from "react-redux";

class LoginComponent extends React.Component {

    // state = {
    //     email: "", pass: ""
    // };
    //dispatch = useDispatch();
    constructor(props) {
        super(props);
        this.onSignIn = this.onSignIn.bind(this);
        this.state = {
            email: "",
            pass: "",
            louding: false,
        };
    }

    onSignIn(e) {
        e.preventDefault();

        this.setState(
            {
                louding: true,
            }
        );
       // const dispatch = useDispatch();
        //const{dispatch} = this.props;

        //dispatch({type:"SIGNIN_SUCCEESS", payload :this.state})
    }

    render() {
        return (

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onSubmitCapture={this.onSignIn}
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