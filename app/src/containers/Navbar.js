import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import Logo from '../images/twatter-logo.png'

class Navbar extends Component {
    logout = (e) => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push("/");
    }
    render() {
        return (
        <nav className="navbar navbar-expand">
            <div className="container-fluid">
                
                <div className="navbar-header">
                        <Link to="/" > 
                            <img src={Logo} alt="Twatter Home" />
                        </Link>
                </div>

                {this.props.currentUser.isAuthenticated ? (
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to={`/users/${this.props.currentUser.user.id}/profile`}>Profile</Link>
                        </li>
                        <li>
                            <Link to={`/users/${this.props.currentUser.user.id}/messages/new`} >New Message</Link>
                        </li>
                        <li>
                            <a  href="#" onClick={this.logout}>Log out</a>
                        </li>
                    </ul>
                ) :
                
                    <ul className="nav navbar-nav ml-auto">
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/signin">Log In</Link>
                        </li>
                    </ul>
                }

            </div>


        </nav>);
    }
};

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, { logout })(Navbar));