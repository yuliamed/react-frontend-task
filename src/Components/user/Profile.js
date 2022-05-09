import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from "../../services/userService";
import jwt from 'jwt-decode'

class Profile extends Component {
    render() {
        const { user: currentUser } = this.props;

        if (!currentUser) {
            return <Navigate to="/sign-in" />;
        }

        let decodedToken = jwt(currentUser.token);
        const { userProfile } = UserService.getProfile(decodedToken.id);
        console.log(userProfile);
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
                    {/* {currentUser.token.substr(currentUser.accessToken.length - 20)} */}
                </p>
                <p>
                    <strong>Id:</strong> {decodedToken.id}
                </p>
                <p>
                    <strong>Email:</strong> {decodedToken.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                    {decodedToken.role &&
                        decodedToken.role.map((index) => <li key={index}>{index.authority}</li>)}
                </ul>
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