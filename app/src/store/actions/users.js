import { apiCall } from '../../services/api';
import { addError } from './errors';
import { GET_USER, GET_MY_USER } from "../actionTypes";

export const getUser = (user) => ({
    type: GET_USER,
    user
});

export const getMyUser = (myUser) => ({
    type: GET_MY_USER,
    myUser
})

export const fetchUser = (user_id) => {
    return dispatch => {
        return apiCall("get", `/api/users/${user_id}`)
            .then(res => dispatch(getUser(res)))
            .catch(err => dispatch(addError(err.message)))
    }
}

export const fetchMyUser = () => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    
        return apiCall("get", `/api/users/${id}`)
            .then(res => dispatch(getMyUser(res)))
            .catch(err => dispatch(addError(err.message)))
}

// Possible edit currentUser profile pic
export const editUser = (profileImageUrl) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;

  return apiCall("put", `/api/users/${id}`, { profileImageUrl })
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};



