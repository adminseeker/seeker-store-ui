import { combineReducers, applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore} from 'redux'
import authReducer from "../reducers/auth";
import thunk from "redux-thunk";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(
        combineReducers({
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
};