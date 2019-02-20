import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_MESSAGES, REMOVE_MESSAGE, LOAD_USER_MESSAGES } from '../actionTypes';

export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

export const remove = id => ({
    type: REMOVE_MESSAGE,
    id
});

export const loadUserMessages = userMessages => ({
    type: LOAD_USER_MESSAGES,
    userMessages
})

// use thunk
export const fetchMessages = () => {
    return dispatch => {
        return apiCall("get", '/api/messages')
            .then(res => dispatch(loadMessages(res)))
            .catch(err => dispatch(addError(err.message)))         
    }
}

// use thunk
export const postNewMessage = (text) => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id
    
    return apiCall("post", `/api/users/${id}/messages`, { text })
        .then(res => {})
        .catch(err => dispatch(addError(err.message)));
}

export const removeMessage = (user_id, message_id) => {
    return dispatch => {
      return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
          .then(() => dispatch(remove(message_id)))
          .catch(err => (addError(err.message)));
    }
}

export const editMessage = (text, message_id) => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;

    return apiCall("put", `/api/users/${id}/messages/${message_id}`, { text })
        .then(res => { })
        .catch(err => dispatch(addError(err.message)));
}


export const addLike = (count, message_id) => (dispatch, getState) => {

    return apiCall("put", `/api/messages/${message_id}`, {
      likes: count + 1
    }).then(res => {})
      .catch(err => dispatch(addError(err.message)));
}

export const fetchUserMessages = (user_id) => {
    return dispatch => {
        return apiCall("get", `/api/messages/`)
            .then(res => dispatch(loadMessages(res.filter(m => m.user._id === user_id))))
            .catch(err => dispatch(addError(err.message)))
    }
}