import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { signUp } from "../../actions/auth";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

//var isButtonDisabled = true;
var isHiddenError = true;
var history
class SignUpComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onSignUp = this.onSignUp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            name: "",
            surname: "",
            email: "",
            pass: "",
            confirmPass: "",
            louding: false,
            message: "",
        };

        history = this.props.history;
    }

    isButtonDisabled = true;

    onChange(e) {
        //e.preventDefault();
        isHiddenError = true;
        this.isButtonDisabled = true;
        if (this.state.email !== undefined && this.state.pass !== undefined
            && this.state.email !== "" && this.state.pass !== "") {
            this.isButtonDisabled = false;
        }
    }

    onSignUp(e) {
        

        this.setState(
            {
                louding: true,
            }
        );

        const { dispatch } = this.props;
        console.log(this.state.email + " " + this.state.pass + this.state.confirmPass);
        dispatch(signUp(this.state.name,
            this.state.surname,
            this.state.email,
            this.state.pass,
            this.state.confirmPass,
        ))
            .then(() => {
                alert("Вы были зарегистрированы")
                history.push("/sign-in");
            })
            .catch(() => {
                const { message } = this.props;
                isHiddenError = false;
                this.setState({ ...this.state, message: message, });
                // this.setState({
                //     message: message,
                //     louding: false
                // });
                //console.log("!!! " + message);

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
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onChange={this.onChange()}
                autoComplete="off"
                onSubmitCapture={this.onSignUp}
                validateMessages={this.validateMessages}
            >
                {/* <Alert message="Warning Text" type="warning" /> */}

                <h1 className='form-label'>Sign Up</h1>
                <Form.Item hidden = "true">
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

export default connect(mapStateToProps)(SignUpComponent)