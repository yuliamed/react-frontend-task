import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Form, Input, Button, Space, Alert, Anchor } from 'antd';
import UserService from "../../services/userService";
import FormItemLabel from "antd/lib/form/FormItemLabel";
import { connect } from "react-redux";
import { signIn } from "../../actions/auth";
import Header from '../common/headers/Header';
import { changePass } from "../../actions/account";
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
const { Link } = Anchor;
//import 'antd/dist/antd.css';
var isButtonDisabled = true;
var isHiddenError = true;
class WithNavigate extends React.Component {

    constructor(props) {
        super(props);
        this.onSignIn = this.onSignIn.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onForgetPass = this.onForgetPass.bind(this);
        this.onSaveNewPass = this.onSaveNewPass.bind(this);
        this.state = {
            email: "",
            pass: "",
            louding: false,
            isPassChanging: false,
        };
    }

    onChange() {
        isHiddenError = true;
        isButtonDisabled = true;
        if (this.state.email != undefined && this.state.pass != undefined
            && this.state.email != "" && this.state.pass != "") {
            isButtonDisabled = false;
        }
        //console.log(isButtonDisabled);
    }

    onSignIn(e) {
        isHiddenError = true;
        this.setState(
            {
                louding: true,
            }
        );
        const { dispatch } = this.props;
        let props = this.props;
        dispatch(signIn(this.state.email, this.state.pass))
            .then(() => {
                e.preventDefault();
                this.props.navigate("../profile", { replace: true });
            })
            .catch(() => {
                isHiddenError = false;
                this.setState({ ...this.state, louding: false })
                console.log("!!!catch " + this.state.louding)
            });
        e.preventDefault();
    }

    onForgetPass(e) {
        UserService.recoverPass(this.state.email).then(
            () => {

                alert("Check your email and input reset token to change password!");
                this.setState({ isPassChanging: true });
                this.render();
            }
        ).catch(() => {
            alert("Error with your email or network!");
            this.setState({ isPassChanging: false });
            this.render();
        });
    }

    onSaveNewPass(e){
        const { dispatch } = this.props;
        if (this.state.newPass == this.state.confirmNewPass) {
            e.preventDefault();
            dispatch(changePass(this.state.newPass, this.state.token))
                .then(
                    () => {
                        
                        alert("We changed your pass!");
                        this.setState({ isPassChanging: false });
                        this.render();
                    }
                )
                .catch(() => {
                    const { message } = this.props;
                    isHiddenError = false;
                    this.setState({ ...this.state, message: message, });
                })

        } else {
            alert("You didn't confirm yoour new pass!")
        }
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
        // if (isLoggedIn) {
        //     console.log("is logged in " + isLoggedIn);
        //     return <Navigate to="/home/" />;
        // }
        let modal = null;
        if (this.state.isPassChanging) {
            modal =
                <div >
                    <p>
                        <Form.Item
                            label="Token:"
                            name="Token"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}>
                            <Input
                                placeholder="Token"
                                onChange={e => this.setState({ ...this.state, token: e.target.value })} />
                        </Form.Item>
                    </p>
                    <p >
                        <Form.Item
                            label="New pass:"
                            name="New pass"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}>
                            <Input.Password
                                placeholder="New pass"
                                onChange={e => this.setState({ ...this.state, newPass: e.target.value })} />
                        </Form.Item>
                    </p>
                    <p>
                        <Form.Item
                            label="Confirm new pass:"
                            name="Confirm new pass"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}>
                            <Input.Password
                                placeholder="Confirm new pass"
                                onChange={e => this.setState({ ...this.state, confirmNewPass: e.target.value })} />
                        </Form.Item>
                    </p>
                    <Button onClick={(e) => this.onSaveNewPass(e)} >Save new pass</Button>
                    {/* <div hidden={isHiddenError}><Form.Item
                        label={"Error of changing pass - " + this.state.message}
                        hidden={isHiddenError}
                        style={
                            { color: "red" }
                        }>Error of changing pass - {this.state.message}</Form.Item>
                    </div> */}
                </div>
        }
        return (
            <div>
                <Header />




                <Form
                    name="basic"
                    onChange={this.onChange()}
                    initialValues={{ remember: true }}
                    onSubmitCapture={this.onSignIn}
                    autoComplete="off"
                    validateMessages={this.validateMessages}
                >
                    <Form.Item>
                        <h1 >Welcomе!</h1>
                    </Form.Item>

                    <Form.Item
                        name="Email"
                        label="Email" rules={[
                            {
                                type: 'email',
                                required: true,
                            }]}
                    >
                        <Input placeholder="email"
                            onChange={e =>
                                this.setState({ ...this.state, email: e.target.value })} />
                    </Form.Item>
                    <div hidden={this.state.isPassChanging}>
                        <Form.Item

                            label="Pass"
                            name="pass"
                            rules={[{
                                required: true,
                            }]}>
                            <Input.Password placeholder="pass"
                                hidden={this.state.isPassChanging}
                                onChange={(e) => {
                                    this.setState({ ...this.state, pass: e.target.value })
                                    console.log(this.state.pass)
                                }
                                } />
                        </Form.Item>
                    </div>

                    <Form.Item >
                        <label hidden={isHiddenError}>Check your authentication data</label>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                        <Button type="primary" htmlType="submit" disabled={isButtonDisabled} hidden={this.state.isPassChanging}>
                            Sign in
                        </Button>
                        {message && (

                            <p className="alert alert-danger" role="alert">
                                {message}
                            </p>

                        )}
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                        <a onClick={(e) => this.onForgetPass(e)} hidden={this.state.isPassChanging}>Forget your pass?</a>
                    </Form.Item>
                    <>
                        {modal}
                    </>
                </Form>
            </div >
        );
    }
}

function LoginComponent(props) {
    let navigate = useNavigate();
    return <WithNavigate {...props} navigate={navigate} />
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
