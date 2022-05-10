import React from 'react';
import { Form, Input, Button } from 'antd';
import { signUp } from "../../actions/auth";
import { connect } from "react-redux";

//var isButtonDisabled = true;
var isHiddenError = true;

class SignUpComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onSignUp = this.onSignUp.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.validateMessages = this.validateMessages.bind(this);
        this.state = {
            name: "",
            surname: "",
            email: "",
            pass: "",
            confirmPass: "",
            louding: false,
        };
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
        console.log("onChange = " + this.isButtonDisabled);
    }

    onSignUp(e) {
        e.preventDefault();

        this.setState(
            {
                louding: true,
            }
        );

        const { dispatch, history } = this.props;
        console.log(this.state.email + " " + this.state.pass + this.state.confirmPass);
        dispatch(signUp(this.state.name,
            this.state.surname,
            this.state.email,
            this.state.pass,
            this.state.confirmPass,
        ))
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
            string: '${label} must be a string!'
        },
        pattern: 'The pass must contain digits and letters.',
        min:
            "Min length of pass is 6",
        max: "Max length is 20"
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

                <label className='form-label'>Sign Up</label>

                <Form.Item
                    label="Name"
                    rules={{
                        required: true,
                        //type: "string"
                    }}
                >
                    <Input
                        placeholder="Carrie "
                        onChange={e => this.setState({ ...this.state, name: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Surname"
                    rules={[{
                        required: true,
                        //type: "string"
                    }]}
                >
                    <Input
                        placeholder="Bradshaw"
                        onChange={e => this.setState({ ...this.state, surname: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    rules={[{
                        type: 'email',
                        //required: true
                    }]}>
                    <Input
                        placeholder="email@mail.com"
                        onChange={e => this.setState({ ...this.state, email: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Pass"
                    rules={[{
                        //required: true,
                        pattern: "^(?=.*[0-9])(?=.*[a-zA-Zа-яА-Я]).{6,20}$",
                        //min: 6,
                        //max: 20
                    }]}>
                    <Input.Password
                        placeholder="pass"
                        onChange={e => this.setState({ ...this.state, pass: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Confirm pass"
                    rules={[
                        {
                            //required: true,
                            pattern: "^(?=.*[0-9])(?=.*[a-zA-Zа-яА-Я]).{6,20}$",
                            //min: 6,
                            //max: 20
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
        )
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