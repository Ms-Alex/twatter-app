import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';

class MessageForm extends Component {
    state ={
        message: ''
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleMessageSubmit = (e) => {
        e.preventDefault();
        this.props.postNewMessage(this.state.message);
        this.setState({
            message: ''
        }, () => this.props.history.push('/'));
    }

    render() {
        return <div>
            <h3>Add a new message:</h3>
            <form onSubmit={this.handleMessageSubmit}>
              {this.props.errors.message && <div className="alert alert-danger">
                  {this.props.errors}
                </div>}

              <input type="text" className="form-control" value={this.state.message} onChange={this.handleChange} placeholder="max of 160 characters" maxLength="160" />
              <br />
              <button type="submit" className="btn btn-success pull-right">
                Add message
              </button>
            </form>
          </div>;
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
