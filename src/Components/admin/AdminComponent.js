import React, { Component } from "react";
import { connect } from "react-redux";
import { LoadingOutlined, PlusOutlined, PlusSquareOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Pagination, List, Layout, Button } from "antd";
import { Col, Divider, Row } from 'antd';
import Header from "../common/headers/Header";
import UserInfoComponent from "./UserInfoComponent";
import { findAll, findAllAll } from "../../actions/manageUsers";
const { Footer, Sider, Content } = Layout;

let thisObj;
let isEdited = false;

const uploadButton = (
    <div>
        {<PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

class AdminComponent extends Component {
    constructor(props) {
        super(props);
        this.findUsers = this.findUsers.bind(this);
        this.state = {
            isLoading: true,
            pagination: {
                page: 0,
                elementsCount: 20,
                totalElements: 0,
                totalPages: 0,
            },
            properties: {
                typeOfRole: "",
                name: "",
                surname: "",
                isActive: "",
            },
            users: [],
        };
        thisObj = this;
    }
    async componentDidMount() {
        this.findUsers();
    }

    findUsers() {
        const { dispatch } = this.props;
        dispatch(findAll()).then((data) => {
            console.log(data.objects)
            thisObj.setState({ users: data.objects });
            thisObj.setState({ pagination: data, isLoading: false });
        });
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        const { users } = this.state.users;
        console.log(users)
        console.log(this.state.users)
        const userList = null;
        
         
        // this.state.users.map((u) => {
        //     console.log("MAPPING" + u)
        //     return <UserInfoComponent
                
        //         user_account={u}
        //     />
        // });



        return (
            <><Header />
                <h1>Nobody care.</h1>
                <Layout align="left"><h1>Nobody care.</h1>
                    {/* <Content>{userList}</Content> */}
                    <Space size={[8, 16]} wrap>
                        {this.state.users.map(
                            (
                                u,
                                index, // eslint-disable-next-line react/no-array-index-key
                            ) => (
                        <UserInfoComponent
                            key={index}
                            user_account={u}
                        />
                        ),
                        )}
                    </Space>
                </Layout>
                <br></br><br></br><br></br>
                <Pagination
                    // onChange={this.findUsers()}
                    total={this.state.pagination.totalElements}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `Total ${total} items`}
                />

            </>
        );
    }
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps)(AdminComponent);