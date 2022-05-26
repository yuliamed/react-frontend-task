import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Form, Input, Button, Space, Alert, Anchor } from 'antd';

import FormItemLabel from "antd/lib/form/FormItemLabel";

import { connect } from "react-redux";
import { signIn } from "../../actions/auth";
const { Link } = Anchor;
//import 'antd/dist/antd.css';
var isButtonDisabled = true;
var isHiddenError = true;
class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onSignIn = this.onSignIn.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            email: "",
            pass: "",
            louding: false,
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
        //e.preventDefault();

        this.setState(
            {
                louding: true,
            }
        );

        const { dispatch } = this.props;
        dispatch(signIn(this.state.email, this.state.pass))
            .then(() => {
                console.log("Lets redirect!!");
                let props = this.props;
                props.history.push('/profile/');
                // let history = useNavigate();
                // history.replace("/profile/");
                let history = useNavigate();
                history.replace("/profile");
                e.preventDefault();
                //    const navigate = useNavigate();
                //    navigate('/profile', {replace: true});
            })
            .catch(() => {
                isHiddenError = false;
                this.setState({ ...this.state, louding: false })
                console.log("!!!catch " + this.state.louding)
            });
        return <Navigate to="/profile/" />;
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
            console.log("is logged in " + isLoggedIn);
            return <Navigate to="/home/" />;
        }
        return (

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

                <Form.Item
                    label="Pass"
                    name="pass"
                    rules={[{
                        required: true,
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
                    {message && (
                        // <div className="form-group">
                        <p className="alert alert-danger" role="alert">
                            {message}
                        </p>
                        //</div>
                    )}
                </Form.Item>
                {/* <Form.Item><Navigate to="/profile/" >Forget password? Click here!</Navigate></Form.Item> */}


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
