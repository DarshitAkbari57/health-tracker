import { apiGet, apiPost } from "../axios";
import * as actionTypes from "../ActionTypes";


export const LoginAPI = (payload, dispatch) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.LOGIN_INIT,
        });

        try {
            const response = await apiPost("users", payload, null);
            if (response.status === 201) {
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    payload: response.data,
                });
                return response.data;
            } else {
                dispatch({
                    type: actionTypes.LOGIN_FAIL,
                    payload: response?.data?.message,
                });
                return response.data;
            }
        } catch (error) {
            console.log("error", error);
            if (error?.status === 404) {
                dispatch({
                    type: actionTypes.LOGIN_FAIL,
                    payload: error?.data?.message,
                });
            } else if (error?.status === 403) {
                dispatch({
                    type: actionTypes.LOGIN_FAIL,
                    payload: error?.data?.message,
                });
            } else if (error?.status === 400) {
                dispatch({
                    type: actionTypes.LOGIN_FAIL,
                    payload: error?.data?.message,
                });
            }
            return error;
        }
    };
}

export const AddLog = (payload, dispatch) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.ADD_LOG_INIT,
        });

        try {
            const response = await apiPost("logs", payload, null);
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.ADD_LOG_SUCCESS,
                    payload: response.data,
                });
                return response;
            } else {
                dispatch({
                    type: actionTypes.ADD_LOG_FAIL,
                    payload: response?.data?.message,
                });
                return response;
            }
        } catch (error) {
            console.log("error", error);
            if (error?.status === 400) {
                dispatch({
                    type: actionTypes.ADD_LOG_FAIL,
                    payload: error?.data?.message,
                });
            } else if (error?.status === 401) {
                dispatch({
                    type: actionTypes.ADD_LOG_FAIL,
                    payload: error?.data?.message,
                });
            }
            return error;
        }
    };
};

export const getLog = async (dispatch, id) => {
    try {
        const response = await apiGet(`logs?userId=${id}`, null);
        if (response.status === 200) {
            dispatch({
                type: actionTypes.GET_LOG_DATA,
                payload: response.data,
            });
            return response.data;
        }
    } catch (error) {
        console.log("error", error);
    }
};