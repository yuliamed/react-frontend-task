import React from 'react';
import { Navigate } from 'react-router-dom';

import { Form, Input, Button, Space } from 'antd';
import FormItemLabel from "antd/lib/form/FormItemLabel";

import { connect } from "react-redux";
import { signIn } from "../actions/auth"
import { isEmail } from "validator";

//import 'antd/dist/antd.css';
var isButtonDisabled = true;
var isHiddenError = true;
class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onSignIn = this.onSignIn.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.validateMessages = this.validateMessages.bind(this);
        this.state = {
            email: "",
            pass: "",
            louding: false,
        };
    }

    onChange(e) {
        e.preventDefault();
        isHiddenError = true;
        isButtonDisabled = true;
        if (this.state.email != undefined && this.state.pass != undefined 
            && this.state.email != "" && this.state.pass != "") {
            isButtonDisabled = false;
        } 
        console.log(isButtonDisabled);
    }

    onSignIn(e) {
        e.preventDefault();

        this.setState(
            {
                louding: true,
            }
        );

        const { dispatch, history } = this.props;
        console.log(this.state.email + " " + this.state.pass);
        dispatch(signIn(this.state.email, this.state.pass))
            .then(() => {
                history.push("/home");
                window.location.reload();
            })
            .catch(() => {
                isHiddenError = false;
                this.setState({
                    louding: false
                });
                console.log("!!! " + this.state.louding)
            });
    }

    validateMessages = {
        
        required: '${label} is required!',
        types: {
            email: '${label} not a valid',
            number: '${label} is not a valid number!',
        },
    };

    render() {
        const { isLoggedIn, message } = this.props;
        if (isLoggedIn) {
            return <Navigate to="/home" />;
        }
        return (

            <Form
                name="basic"
                onChange={this.onChange}
                initialValues={{ remember: true }}
                onSubmitCapture={this.onSignIn}
                autoComplete="off"
                validateMessages={this.validateMessages}
            >

                <Form.Item>
                    <FormItemLabel label="Welcomе!"></FormItemLabel>
                </Form.Item>

                <Form.Item
                    label="Email" rules={[{ type: 'email' }]}
                >
                    <Input placeholder="email"
                        onChange={e =>
                            this.setState({ ...this.state, email: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="pass"
                    name="pass"
                    rules={[{
                        required: true,
                       message: 'Please input your password!'
                    }]}>
                    <Input.Password placeholder="pass"
                        onChange={(e) => {
                            this.setState({ ...this.state, pass: e.target.value })
                            console.log(this.state.pass)
                        }
                        } />
                </Form.Item>

                <Form.Item >
                    <label hidden={isHiddenError}>Check your authentication data</label>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                    <Button type="primary" htmlType="submit" disabled={isButtonDisabled}>
                        Sign in
                    </Button>
                </Form.Item>
            </Form>

        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}
export default connect(mapStateToProps)(LoginComponent);
