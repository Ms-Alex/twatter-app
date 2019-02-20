import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';
import userInfo from './users';
import myUserInfo from './myUser';

const rootReducer = combineReducers({
    currentUser,
    errors,
    messages,
    userInfo,
    myUserInfo
});

export default rootReducer;