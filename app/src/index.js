import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { configStore } from './store/index';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { setAuthorizationToken, setCurrentUser } from './store/actions/auth';
import jwtDecode from 'jwt-decode'

const store = configStore();

if(localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    // prevent someone from manually tampering with the key of jwtToken in localStorage
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
    } catch (e) {
        store.dispatch(setCurrentUser({}))
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
