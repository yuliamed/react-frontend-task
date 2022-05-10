import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from "../../services/userService";
//import jwt from 'jwt-decode'

class Profile extends Component {
    constructor(props) {
        super(props);
        //this.onSignUp = this.onSignUp.bind(this);
        //this.onChange = this.onChange.bind(this);
        this.state = {
            email: "",
            id: "",
            roles: "",
            user: {
                name: "",
                surName: "",
                image: ""
            },
            louding: false,
        };
    }

    render() {
        const { user: currentUser } = this.props;
        if (!currentUser) {
            return <Navigate to="/sign-in" />;
        }

        // let decodedToken = jwt(currentUser.token);//JSON.parse(localStorage.getItem('user'));
        const userProfile = UserService.getProfile(currentUser.id)
            .then(response => {
                const res = response.data;
                //this.setState({name: res.id});
                return res;
            }).catch(error => {
                console.log(error);
            });
        //const userProfile = JSON.parse(userProfile0);
        console.log("currnt user " + currentUser.id)
        console.log(userProfile.id);
        return (
            <div className="container">
                HI FROM PROFILE

                {/* <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                </header> */}
                <p>
                    <strong>Token:</strong> {currentUser.token}
                </p>
                {/* <p>
                    <strong>Id:</strong> {decodedToken.id}
                </p>
                <p>
                    <strong>Email:</strong> {decodedToken.email}
                </p> */}
                <p>
                    <strong>Name:</strong> {this.state.user.name}
                </p>
                <p>
                    <strong>Surname:</strong> {userProfile.surname}
                </p>
                <strong>Authorities:</strong>
                {/* <ul>
                    {decodedToken.role &&
                        decodedToken.role.map((index) => <li key={index}>{index.authority}</li>)}
                </ul> */}
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