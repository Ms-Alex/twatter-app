import { SET_CURRENT_USER } from '../actionTypes';

const initialState = {
    isAuthenticated: false, // true when user is logged in
    user: {} // all user info when user is logged in
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                // if there are key, return true
                isAuthenticated: Object.keys(action.user).length > 0,
                user: action.user
            };
        default:
            return state;
    }
}