import { FETCH_ALL, CREATE, FETCH_ONE, UPDATE } from '../contants/actionTypes';
import * as api from '../api/index.js';

export const getThreads = () => async (dispatch) => {
    try {
        const { data } = await api.fetchThreads();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const getThread = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchThread(id);
        dispatch({ type: FETCH_ONE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createThread = (thread) => async (dispatch) => {

    try {
        const { data } = await api.createThread(thread);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateComment = (id, comments) => async (dispatch) => {
    try {
        console.log(id);
        const { data } = await api.updateComment(id, comments);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
