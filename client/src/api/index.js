import axios from 'axios';

const url = 'http://localhost:5000/threads';

export const fetchThreads = () => axios.get(url);
export const fetchThread = (id) => axios.patch(`${url}/${id}`);
export const createThread = (newthread) => axios.post(url, newthread);
export const updateComment = (id, newcomment) => axios.patch(`${url}/${id}`, newcomment);
