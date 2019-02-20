import { LOAD_MESSAGES, REMOVE_MESSAGE, LOAD_USER_MESSAGES } from '../actionTypes';

const message = (state = [], action) => {
    switch(action.type) {
        case LOAD_MESSAGES:
            return [...action.messages];
        case REMOVE_MESSAGE:
            return state.filter(message => message._id !== action.id);
        case LOAD_USER_MESSAGES:
            return [...action.userMessages]
        default:
            return state;
    }
} 

export default message;