import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/authActions";
import axios from "axios";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = { userAppProfiles: [] }

        //-- Binding Class Level function = deleteFunction (NOT USING REDUX HERE)
        this.handleCredentialCheckClick = this.handleCredentialCheckClick.bind(this);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    handleCredentialCheckClick(event) {

        console.log('IN: handleCredentialCheckClick()');

        /**
         * Need to set 2 headers 
         *  1. Authorization Token. This is already set in login setAuthToken
         *  2. x-api-key. This we will do here - HARDCODED FOR NOW.
         * 
         */

        axios.defaults.headers.common["x-api-key"] = "e64bb79f-9c92-443f-b153-28ceab8e48a6";

        axios
            .get('/user/me/appProfile')
            .then(res => {
                console.log('GET Result = ', res.data);
                const { authorizedAppUserGroups } = res.data;
                console.log('authorizedAppUserGroups', authorizedAppUserGroups);
                this.setState({ userAppProfiles: authorizedAppUserGroups });
            })
            .catch(err => { console.error(err); });


        console.log('User Profiles Returned', this.state.userProfiles)

    };

    render() {
        const { user } = this.props.auth;

        return (
            <div className='container'>
                <h4>
                    Hi, {user.userName} !!
                </h4>

                <p className="flow-text grey-text text-darken-1">
                    You are logged into Demo WEB Application using iPriotix IAM Server
                 </p>

                <button
                    style={{
                        width: "250px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    onClick={this.handleCredentialCheckClick}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-4">
                    My App Credentials
                </button>

                <button
                    style={{
                        width: "250px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable red accent-3">
                    Logout
                </button>


                <div class="row">
                    <div class="col s12 m6">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">User App Profile</span>
                                <p>{JSON.stringify(this.state.userAppProfiles)}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>);
    } // end of render()
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
