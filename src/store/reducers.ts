import { combineReducers } from "redux";
import { appReducer } from "store/app/reducers";

export default combineReducers({
    app: appReducer
});