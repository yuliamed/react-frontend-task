import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Descriptions, Col, Row } from 'antd';
import React, { Component } from 'react';
import { BASE_USER_PICTURE } from '../../constants/const';
const { Meta } = Card;

export default class UserCard extends Component {
  render() {
    return (
      <>
        <Card
          style={{
            // width: 300,
            marginLeft: 25,
            marginRight: 25,
            marginTop: 16,
          }}
        ><Row align="middle">
            <Col span={6} >
              <img style={{
             width: 100,
          }} src={BASE_USER_PICTURE} />
            </Col>
            <Col span={18} >
               <Meta
              title="User names"/>
              <Descriptions contentStyle={{ "font-weight": 'bold' }}>
                <Descriptions.Item
                  label="Last visit:"
                  style={{ margin: '0 16px' }}
                >
                  12.08.2022
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      </>
    )
  }
}
