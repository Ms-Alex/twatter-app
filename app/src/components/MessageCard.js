import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import defaultProfileImg from '../images/default-profile-image.png';
import EditForm from '../containers/EditForm';
import WhiteHeart from '../images/heart-white.png';
import RedHeart from '../images/heart-red.png';

class MessageCard extends Component {
    state = {
      editOn: false
    }

    componentDidMount(){

      window.$('[data-toggle="popover"]').popover({ container: "body", });
      window.$('.popover-dismiss').popover({
        trigger: 'focus'
      })

    }

    renderButtons = () => {
      if(this.props.profileCard){
      return (
        <div className="my-buttons">
          <button className="btn btn-danger" onClick={this.props.removeMessage()}>
            Delete
            </button> &nbsp; 
            <button className="btn btn-warning" onClick={() => this.setState({editOn: true})}>
            Edit
            </button> 
        </div>
      )}
    }

    renderView = () => {
      if(this.state.editOn === true) {
        return <EditForm editOff={this.handleEditStateOnSave} text={this.props.text} id={this.props.mID} />
      }
      return this.renderButtons();
    }

    handleEditStateOnSave = () => {
      this.setState({
        editOn: false
      })
    }

    likesCount = () => {
      if(this.props.likes === 1) {
        return `${this.props.likes} like`
      } else if(this.props.likes > 1) {
        return `${this.props.likes} likes`;
      }
    } 

    renderHeartImg = () => {
      if(this.props.likes === 0) {
        return <img src={WhiteHeart} alt="white heart" width="50" height="50" />;
      }
      return <img src={RedHeart} alt="red heart" width="50" height="50" />;
    }

    handleHeartClick = () => {
      if(!this.props.isCorrectUser) {
        return this.props.addLike(this.props.likes, this.props.mID);
      }
    }

    render() {
      return <div className="message-card">
          <li className="list-group-item">
            <img src={this.props.profileImageUrl || defaultProfileImg} alt={this.props.username} height="100" width="100" className="timeline-image" />
            <div className="message-area">
              <Link to={`/users/${this.props.user}/profile`}>
                @{this.props.username} &nbsp; &nbsp;
              </Link>
              <span className="text-muted">
                <Moment className="text-muted" format="Do MMM YYYY">
                  {this.props.date}
                </Moment>
              </span>

              {this.state.editOn === false && <div>
                  {this.props.text}
                </div>}
              <div className="heart">
                {this.props.isCorrectUser ? 
                  (<span className="heart-image heartTooltip" data-trigger="focus"  tabIndex="-1" data-container="body" data-toggle="popover" data-placement="left" data-content="Cannot like your message.">
                    {this.renderHeartImg()}
                  </span> )
                  : 
                  (<span className="heart-image" onClick={this.handleHeartClick}>
                    {this.renderHeartImg()}
                  </span> )
                  }

                {this.likesCount()}
              </div>

              {this.props.isCorrectUser && this.renderView()}
            </div>
          </li>
        </div>;
    }
}

export default MessageCard;
