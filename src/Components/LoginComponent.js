import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import FormItemLabel from "antd/lib/form/FormItemLabel";
import { connect } from "react-redux";
import {signIn} from "../actions/auth"
import { Redirect } from 'react-router-dom';
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

        const { dispatch, history } = this.props;

        dispatch(signIn(this.state.email, this.state.pass))
            // .then(() => {
            //     // history.push("/home");
            //     // window.location.reload();
            // })
            .catch(() => {
                this.setState({
                    loading: false
                });
            });
        // const dispatch = useDispatch();
        //const{dispatch} = this.props;

        //dispatch({type:"SIGNIN_SUCCEESS", payload :this.state})
    }

    render() {
        const { isLoggedIn, message } = this.props;
        if (isLoggedIn) {
            //return <Redirect to="/home" />;
        }
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

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}
export default connect(mapStateToProps)(LoginComponent);
