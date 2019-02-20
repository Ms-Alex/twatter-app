import rootReducer from './reducers';
// compose will allow us to combine functions together
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export function configStore(){
    const store = createStore(rootReducer, 
            compose(applyMiddleware(thunk), 
                window.devToolsExtension ? window.devToolsExtension() : f => f
            )
        );

    return store;
}