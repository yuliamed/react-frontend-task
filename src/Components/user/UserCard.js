import { Card, Descriptions, Col, Row, Image } from 'antd';
import React, { Component } from 'react';
import { BASE_USER_PICTURE } from '../../constants/const';
import { getPhoto, } from "../../actions/account";
import { connect } from "react-redux";
const { Meta } = Card;

class UserCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      user: this.props.user,
      imageData: null
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPhoto(this.props.user.id)).then(
      (responce) => {
        this.setState({ imageData: responce })
      })
  }

  render() {
    console.log(this.state.imageData==null);
    return (
      <>
        <Card
          style={{
            marginLeft: 25,
            marginRight: 25,
            marginTop: 16,
          }}
        ><Row align="middle">
            <Col span={6} >
              <Image
                style={{
                  padding: "2%"
                }}
                src={this.state.imageData == null ? BASE_USER_PICTURE : `data:image/jpeg;base64,${this.state.imageData}`}
                preview={false}
              />
            </Col>
            <Col span={18} >
              <Meta
                title={this.state.user.name +" "+ this.state.user.surname} />
                
              <Descriptions style={{ "font-weight": 'bold', margin:10 }}>
                <Descriptions.Item
                  label="Last visit"
                  style={{ margin: '0 16px' }}
                >
                  {this.state.user.lastVisitDate}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      </>
    )
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message
  };

}

export default connect(mapStateToProps)(UserCard);

