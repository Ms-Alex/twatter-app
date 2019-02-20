import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserMessages, removeMessage, addLike } from '../store/actions/messages';
import MessageCard from '../components/MessageCard';

class UserMessages extends Component {
    componentDidMount() {
        this.props.fetchUserMessages(this.props.userID);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.messages !== this.props.messages) {
            this.props.fetchUserMessages(this.props.userID);
        }
    }

    render() {
        const { messages, currentUser } = this.props;
        let messageList = messages.map(message => <MessageCard profileCard key={message._id} mID={message._id} date={message.createdAt} text={message.text} username={message.user.username} profileImageUrl={message.user.profileImageUrl} removeMessage={removeMessage.bind(this, message.user._id, message._id)} isCorrectUser={currentUser.user.id === message.user._id} likes={message.likes} addLike={this.props.addLike} user={message.user._id} />);

        // console.log(currentUser);
        return (
            <div className="row col-sm-8">
                <div className="offset-1 col-sm-10">
                    <ul className="list-group" id="messages">
                        {messageList}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, { fetchUserMessages, removeMessage, addLike })(UserMessages);
