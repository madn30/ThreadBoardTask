import { FETCH_ALL, CREATE, FETCH_ONE, UPDATE } from '../contants/actionTypes';
import * as api from '../api/index.js';

export const getThreads = () => async (dispatch) => {
    try {
        console.log("inside");
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

export const addComment = (id, comments) => async (dispatch) => {
    try {
        const { data } = await api.addComment(id, comments);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
export const updateComment = (id, name) => async (dispatch) => {
    try {

        const { data } = await api.updateComment(id, name);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
