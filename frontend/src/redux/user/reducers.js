import * as actionTypes from "../ActionTypes";

const initialState = {
    exampleData: [],
    LogData: [],

};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TEST_INIT:
            return {
                ...state,
            };
        case actionTypes.TEST_SUCCESS:
            return {
                ...state,
                exampleData: action.payload,
            };
        case actionTypes.TEST_FAIL:
            return {
                ...state,
                error: "",
            };

        case actionTypes.GET_LOG_DATA:
            return {
                LogData: action.payload,
            };

        default:
            return state;
    }
};

export default UserReducer;
