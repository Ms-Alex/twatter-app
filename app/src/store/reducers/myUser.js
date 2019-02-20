import { GET_MY_USER } from '../actionTypes';

const myUser = (state = {}, action) => {
    switch (action.type) {
        case GET_MY_USER:
            return { ...action.myUser };
        default:
            return state;
    }
}

export default myUser;