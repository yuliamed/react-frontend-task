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

const uploadButton = (
    <div>
        {<PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

class AdminComponent extends Component {
    constructor(props) {
        super(props);
        
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
        this.findUsers = this.findUsers.bind(this);
        thisObj = this;
    }
    async componentDidMount() {
        // this.findUsers(this.state.pagination.page, this.state.pagination.elementsCount);
        const { dispatch } = this.props;
        dispatch(findAll(this.state.pagination.page, this.state.pagination.elementsCount))
        .then((data) => {
            console.log(data.objects)
            thisObj.setState({ users: data.objects });
            thisObj.setState({ pagination: data, isLoading: false });
        });

    }

    findUsers(page, pageNumber) {
        const { dispatch } = this.props;
        this.setState({ isLoading: true });
        dispatch(findAll(page, pageNumber)).then((data) => {
            console.log(data.objects)
            this.setState({ users: data.objects });
            this.setState({ pagination: data, isLoading: false });
        });


    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <><Header />
                <Layout align="left">
                    <Space size={[8, 16]} wrap>
                        {this.state.users.map(
                            (
                                u,
                                index,
                            ) => (
                                <UserInfoComponent
                                    key={u.id}
                                    user_account={u}
                                />
                            ),
                        )}
                    </Space>
                </Layout>
                <br></br><br></br><br></br>
                <Pagination
                    onChange={(page, elementsCount) => {

                        console.log(page + " " + elementsCount)
                        let pag = {
                            page: page - 1,
                            elementsCount: elementsCount,
                            totalElements: this.state.pagination.totalElements,
                            totalPages: this.state.pagination.totalPages,
                        }
                        this.setState({ ...this.state.pagination, page: page });
                        console.log(this.state.pagination.page + " " + this.state.pagination.elementsCount)

                        this.findUsers(page - 1, elementsCount);
                        console.log("NEW LIST " + this.state.users)

                    }}
                    current={this.state.pagination.page+1}
                    total={this.state.pagination.totalElements}
                    showSizeChanger
                    showQuickJumper
                    pageSize={this.state.pagination.elementsCount}
                    showTotal={(total) => `Total ${total} items`}
                />

            </>
        );
    }
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps)(AdminComponent);