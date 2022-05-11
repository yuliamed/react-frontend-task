import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from "../../services/userService";
import jwt from 'jwt-decode'
import { Button, Input} from "antd";
let thisObj;
class Profile extends Component {
    constructor(props) {
        super(props);
        //this.onSignUp = this.onSignUp.bind(this);
        this.onChangeProfile = this.onChangeProfile.bind(this);
        this.state = {
            email: localStorage.getItem("email"),
            id: "",
            roles: "",
            user: {
                name: "",
                surname: "",
                image: ""
            },
            louding: false,
        };
        thisObj = this;
    }

onChangeProfile(){
    console.log("Change!")
}

    async componentDidMount() {
        const { user: currentUser } = this.props;
        let decodedToken = jwt(currentUser.token);//JSON.parse(localStorage.getItem('user'));
        UserService.getProfile(decodedToken.id).then(
            data=>{
                thisObj.setState({ user: data, isLoading: false  })
            }
        )
    }

    render() {
        const { user: currentUser } = this.props;
        if (!currentUser) {
            return <Navigate to="/sign-in" />;
        }
        
        return (
            <div className="container">
                HI FROM PROFILE

                {/* <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                </header> */}
                {/* <p>
                    <strong>Token:</strong> {currentUser.token}
                </p> */}
                {/* <p>
                    <strong>Id:</strong> {decodedToken.id}
                </p>*/}
                <p>
                    <strong>Email:</strong> <Input placeholder="Surname" value= {this.state.user.email}></Input>
                </p> 
                <p>
                    <strong>Name:</strong> <Input placeholder="Surname" value={this.state.user.name}></Input> 
                </p>
                <p>
                    <strong>Surname:</strong> <Input placeholder="Surname" value={this.state.user.surname}></Input>
                </p>
                <p>
                    <strong>Image:</strong> {this.state.user.image}
                </p>
                <Button onClick={this.onChangeProfile()} value>Change Profile</Button>
                {/* <strong>Authorities:</strong>
                 <ul>
                    {decodedToken.role &&
                        decodedToken.role.map((index) => <li key={index}>{index.authority}</li>)}
                </ul>  */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);