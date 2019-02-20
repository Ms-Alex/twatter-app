import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MessageList from './MessageList';
import UserAside from '../components/UserAside';
import { fetchMyUser } from '../store/actions/users';

class MessageTimeline extends PureComponent {
    componentDidMount(){
        this.props.fetchMyUser();
    }

    render(){
    return <div className="row">
        <UserAside profileImageUrl={this.props.myUserInfo.profileImageUrl} username={this.props.myUserInfo.username} />
        <MessageList />
      </div>;
    }
}

function mapStateToProps(state){
    return {
        myUserInfo: state.myUserInfo
    }
}

export default connect(mapStateToProps, { fetchMyUser })(MessageTimeline);
