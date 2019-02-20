import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editMessage } from '../store/actions/messages';

class EditForm extends Component {
    state = {
        message: this.props.text
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSaveSubmit = (e) => {
        e.preventDefault();
        this.props.editMessage(this.state.message, this.props.id);
        this.props.editOff();
    }

    render() {
        return <form onSubmit={this.handleSaveSubmit}>
            <br />
            <input type="text" className="form-control" onChange={this.handleChange} value={this.state.message} maxLength="160" />
            <br />
            <button type="submit" className="btn btn-success">Save</button>
          </form>;
    }
}

export default connect(null, { editMessage })(EditForm);

