import { combineReducers } from "redux";
import userReducer from "./user/reducers";

const rootReducer = combineReducers({
    User: userReducer,
});

export default rootReducer;
