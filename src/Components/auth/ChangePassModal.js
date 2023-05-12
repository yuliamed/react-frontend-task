import React, { Component } from 'react';
import { Button, Col, Form, Input } from 'antd';
import { changePass } from '../../actions/account';
import { connect } from 'react-redux';
import { ORDER_CLOSED_COLOR } from '../../constants/colors';
import { ERROR_DIFFERENT_PASS, ERROR_RESET_PASS } from '../../constants/messages';
import TextArea from 'antd/lib/input/TextArea';
var isDisabled = true;
class ChangePassModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      louding: false,
      token: "",
      newPass: "",
      newPassCom: "",
      message: '',

    };
    this.onSave = props.onSave;
    this.onCancel = props.onCancel;
    this.onSaveNewPass = this.onSaveNewPass.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSaveNewPass() {
    const { dispatch } = this.props;
    if (this.state.newPass == this.state.newPassCom) {
      dispatch(changePass(this.state.newPass, this.state.token))
        .then(
          () => {
            alert("Пароль был изменён!");
            this.onSave();
            this.render();
          }
        )
        .catch(() => {
          const { message } = this.props;
          alert(ERROR_RESET_PASS);
          this.setState({ ...this.state, message: message, });
        })

    } else {
      alert("Вы не подтвердили свой пароль!")
    }
  }

  onChange() {
    isDisabled = true;
    if (this.state.newPassCom != undefined && this.state.newPass != undefined
      && this.state.newPassCom != "" && this.state.newPass != ""
      && this.state.token != "" && this.state.token != undefined) {
      isDisabled = false;
    }
    if (this.state.newPassCom != this.state.newPass) {
      isDisabled = true;
    }
  }

  render() {
    return (
      <div >
        <Form
          onChange={this.onChange()}
        >
          <Form.Item>
            <h1>Изменения пароля</h1>
            <h3 style={{ color: ORDER_CLOSED_COLOR }}>Проверьте почту {this.props.email} </h3>
          </Form.Item>

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
          {/* <p>
            <Form.Item
              label="Новый пароль:"
              rules={[
                {
                  required: true,
                }
              ]}>
              <Input.Password
                placeholder="Новый пароль"
                onChange={e => this.setState({ ...this.state, newPass: e.target.value })} />
            </Form.Item>
          </p> */}
          <Form.Item
            label="Пароль"
            name="Пароль"
            rules={[{
              required: true,
              //pattern: "^(?=.*[0-9])(?=.*[a-zA-Zа-яА-Я]).{6,20}$",
            }]}>
            <Input.Password

              placeholder="Пароль"
              onChange={e => this.setState({ ...this.state, newPass: e.target.value })} />
          </Form.Item>

          <Form.Item
            label="Повтор пароля"
            name="Повтор пароля"
            rules={[
              {
                required: true,
                //  pattern: "^(?=.*[0-9])(?=.*[a-zA-Zа-яА-Я]).{6,20}$",
              }
            ]}>
            <Input.Password
              placeholder="Повтор пароля"
              onChange={e => this.setState({ ...this.state, newPassCom: e.target.value })} />
          </Form.Item>
          <p>{this.state.message}</p>
          <Button disabled={isDisabled} onClick={(e) => this.onSaveNewPass(e)}>Сохранить</Button>
          <Col>
            <Button onClick={(e) => this.onCancel(e)} >Отмена</Button>
          </Col>
        </Form>
      </div>
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
export default connect(mapStateToProps)(ChangePassModal);
