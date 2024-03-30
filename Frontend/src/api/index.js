import axios from "axios";



const API = axios.create({ baseURL: "http://127.0.0.1:5000" });
export const summarize = (id, question) => API.post('/api', { id, question })
export const googleResult = (query) => API.post('/gsearch', { query })