import React from 'react';
import { Form, Input, Button, Alert, Checkbox } from 'antd';
import { signUp } from "../../actions/auth";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../common/headers/Header';
import { ContactsOutlined } from '@ant-design/icons';

class WithNavigate extends React.Component {

    constructor(props) {
        super(props);
        this.onSignUp = this.onSignUp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCheckAutoPicker = this.onCheckAutoPicker.bind(this);
        this.state = {
            name: "",
            surname: "",
            email: "",
            pass: "",
            confirmPass: "",
            louding: false,
            message: "",
            isAutoPicker: false,
            isHiddenError: true,
        };
    }

    isButtonDisabled = true;

    onChange(e) {
        //e.preventDefault();
        //isHiddenError = true;
        this.isButtonDisabled = true;
        if (this.state.email !== undefined && this.state.pass !== undefined
            && this.state.email !== "" && this.state.pass !== "") {
            this.isButtonDisabled = false;
        }
    }

    onCheckAutoPicker(e) {
        this.setState(
            {
                louisAutoPicker: !this.state.isAutoPicker,
            }
        );

    }
    onSignUp(e) {
        //isHiddenError = true;
        if (this.state.pass !== this.state.confirmPass) {
            //isHiddenError = false;
            this.setState({ ...this.state, message: "Confirm your pass!", isHiddenError: false, });
            // this.setState({ ...this.state, });
            return;
        }

        this.setState(
            {
                louding: true,
            }
        );

        const { dispatch } = this.props;
        dispatch(signUp(this.state.name,
            this.state.surname,
            this.state.email,
            this.state.pass,
            this.state.confirmPass,
            this.state.isAutoPicker
        ))
            .then(() => {
                alert("Вы были зарегистрированы")
                this.props.navigate("../sign-in", { replace: true });
            })
            .catch(() => {
                console.log("ERROR");
                const { message } = this.props;
                this.setState({ ...this.state, isHiddenError: false, message: message, });
                // this.setState({ ...this.state, message: message, });

            });
        e.preventDefault();
    }

    validateMessages = {
        required: '${label} is required!',
        pattern: '${label} must contain digits and letters.',
        types: {
            email: '${label} not a valid',
            number: '${label} is not a valid number!',
            string: '${label} must be a string!'
        },

        // min:
        //     "Min length of pass is 6",
        // max: "Max length is 20"
    };

    render() {

        return (
            <div><Header />
                <Form
                    style={{
                        width: "50%",
                        marginLeft: "10%"
                    }}
                    name="basic"
                    initialValues={{ remember: true }}
                    onChange={this.onChange()}
                    autoComplete="off"
                    onSubmitCapture={this.onSignUp}
                    validateMessages={this.validateMessages}
                >
                    {/* <Alert message="Warning Text" type="warning" /> */}

                    <h1 className='form-label'>Sign Up</h1>
                    <Form.Item hidden="true">
                        <Alert message={this.state.message} type="error" />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="Name"
                        rules={[{
                            required: true,
                            type: "string"
                        }]}
                    >
                        <Input
                            placeholder="Carrie "
                            onChange={
                                e => this.setState({ ...this.state, name: e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        label="Surname"
                        name="Surname"
                        rules={[{
                            required: true,
                            type: "string"
                        }]}
                    >
                        <Input
                            placeholder="Bradshaw"
                            onChange={e => this.setState({ ...this.state, surname: e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="Email"
                        rules={[{
                            type: 'email',
                            required: true,
                            //pattern: "^[a-z](\.?\w)*@[a-z]+(\.[a-z]+)+"
                        }]}>
                        <Input
                            placeholder="email@mail.com"
                            onChange={e => this.setState({ ...this.state, email: e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        label="Pass"
                        name="Pass"
                        rules={[{
                            required: true,
                            //pattern: "^(?=.*[0-9])(?=.*[a-zA-Zа-яА-Я]).{6,20}$",
                        }]}>
                        <Input.Password

                            placeholder="pass"
                            onChange={e => this.setState({ ...this.state, pass: e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        label="Confirm pass"
                        name="Confirm pass"
                        rules={[
                            {
                                required: true,
                                //  pattern: "^(?=.*[0-9])(?=.*[a-zA-Zа-яА-Я]).{6,20}$",
                            }
                        ]}>
                        <Input.Password
                            placeholder="confirm pass"
                            onChange={e => this.setState({ ...this.state, confirmPass: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        hidden={this.state.isHiddenError}
                        style={
                            { color: "red" }
                        }>{this.state.message}</Form.Item>

                    <Form.Item
                    >
                        <Checkbox onChange={e => this.setState({
                            ...this.state, isAutoPicker: true
                        })}>Sign up as auto-picker
                        </Checkbox>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 8, span: 16 }}

                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            shape='round'
                            disabled={this.isButtonDisabled}>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

}

function SignUpComponent(props) {
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

export default connect(mapStateToProps)(SignUpComponent)