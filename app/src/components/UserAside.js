import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import defaultProfileImage from '../images/default-profile-image.png';

class UserAside extends PureComponent {
  state = {
    imgUrl: ''
  }

  resetModal = (e) => {
    this.setState({ imgUrl: '' });
    window.$('#urlModal').modal('hide');
  }

  handleImgSubmit = (e) => {
    e.preventDefault();
    this.props.editUser(this.state.imgUrl);
    this.resetModal();
    this.props.history.push('/');
  }

  renderEditPic = () => {
    if(this.props.profileAside && this.props.isCorrectUser){
      return (
        <Fragment>
          <a href="#" className="edit-pic" data-toggle="modal" data-target="#urlModal">
            Edit Profile Image
          </a>

          <div className="modal fade" id="urlModal" tabIndex="-1" role="dialog" aria-labelledby="urlModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="urlModalLabel">Enter New Image Url:</h5>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.handleImgSubmit}>
                    <input type="text" className="form-control" value={this.state.imgUrl} onChange={e => this.setState({imgUrl: e.target.value})} />
                    <br />
                    <button type="button" className="btn btn-secondary" onClick={this.resetModal}>Close</button>
                    &nbsp;
                    <button type="submit" className="btn btn-primary">Save changes</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </Fragment>
      )
    }
  }

  render(){
    const { profileImageUrl, username } = this.props;

    return <aside className="col-sm-2">
        <div className="panel panel-default">
          <div className="panel-body">
          <img src={profileImageUrl || defaultProfileImage} alt={username} className="img-thumbnail" width="200" height="200" />
            <p>{username}</p>
            {this.renderEditPic()}
          </div>
        </div>
      </aside>;
  }
}

export default withRouter(UserAside);
