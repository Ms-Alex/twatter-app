import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserAside from '../components/UserAside';
import UserMessages from './UserMessages';
import { fetchUser, editUser } from "../store/actions/users";


class ProfilePage extends Component {

    componentDidMount(){
        this.props.fetchUser(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
          this.props.fetchUser(this.props.match.params.id);
        }
    }

    render() {
        const { username, profileImageUrl, _id } = this.props.userInfo;

        return <div>
            <h2>Profile Page</h2>
            <div className="row">
              <UserAside profileAside isCorrectUser={this.props.currentUser.user.id === _id} username={username} profileImageUrl={profileImageUrl} editUser={this.props.editUser} />
              <UserMessages userID={_id} />
            </div>
          </div>;
    }
}

function mapStateToProps(state) {
    return { 
        userInfo: state.userInfo, 
        currentUser: state.currentUser 
    };
}


export default connect(mapStateToProps, { fetchUser, editUser })(ProfilePage);
