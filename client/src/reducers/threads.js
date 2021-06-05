import { FETCH_ALL, CREATE, UPDATE } from '../contants/actionTypes';

export default (threads = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...threads, action.payload];
        case UPDATE:
            return threads.map(thread => thread._id === action.payload._id ? { ...thread, comments: action.payload.comments } : thread)
        default:
            return threads;
    }
};