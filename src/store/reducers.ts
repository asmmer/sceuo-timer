import { combineReducers } from "redux";

import { appReducer } from "./app/reducers";
// import { timerReducer } from "./timer/reducers";

export default combineReducers({
    app: appReducer,
    // timer: timerReducer
});