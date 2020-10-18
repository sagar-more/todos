import axios from "axios";
import { LOG_IN, REGISTER } from "../actions";

const axiosInstance = axios.create({
    baseURL: "/api/",
    timeout: 1000 * 60 * 5, // 5 min timeout
    transformResponse: (data) => JSON.parse(data),
});

export const register = (dispatch, { userEmail, password }) => {
    dispatch({ type: REGISTER, payload: { loading: true } });
    try {
        axiosInstance.post("/register", { userEmail, password })
            .then(({ data }) => {
                dispatch({ type: REGISTER, payload: { loading: false, success: data } })
            })
            .catch(({ response: { data: { error } } }) => {
                dispatch({ type: LOG_IN, payload: { loading: false, error } });
            });
    } catch (error) {
        dispatch({ type: REGISTER, payload: { loading: false, error } });
    }
};

export const login = (dispatch, { userEmail, password }) => {
    dispatch({ type: LOG_IN, payload: { loading: true } });
    try {
        axiosInstance.post("/login", { userEmail, password })
            .then(({ data }) => {
                dispatch({ type: LOG_IN, payload: { loading: false, success: data } })
            })
            .catch(({ response: { data: { error } } }) => {
                dispatch({ type: LOG_IN, payload: { loading: false, error } });
            });
    } catch (error) {
        dispatch({ type: LOG_IN, payload: { loading: false, error } });
    }
};

export const getTodos = async () => {
    const todos = await axiosInstance.get("/todos");
    return todos;
};

export const createTodo = async ({ userID, title, description }) => {
    const response = await axiosInstance.post("/todo", {
        userID,
        title,
        description,
    });
    return response;
};
