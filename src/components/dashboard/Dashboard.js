import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/authActions";
import axios from "axios";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            authApplicationName : 'Auth App',
            authGroupsAndFunctions : [] 
        }

        //-- Binding Class Level function = deleteFunction (NOT USING REDUX HERE)
        this.handleCredentialCheckClick = this.handleCredentialCheckClick.bind(this);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    handleCredentialCheckClick(event) {

        console.log('IN: handleCredentialCheckClick()');

        axios
            .get('/user/me/appProfile')
            .then(res => {
                console.log('GET Result = ', res.data);
                const { authApplicationName, authGroupsAndFunctions } = res.data;
                
                console.log('authApplicationName', authApplicationName);
                console.log('authGroupsAndFunctions', authGroupsAndFunctions);
                
                this.setState(
                    { authApplicationName : authApplicationName , 
                      authGroupsAndFunctions: authGroupsAndFunctions });
            })
            .catch(err => { console.error(err); });


        console.log('User Profiles Returned', this.state)

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
                                <span class="card-title">{this.state.authApplicationName}</span>
                                <p>{JSON.stringify(this.state.authGroupsAndFunctions)}</p>
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
