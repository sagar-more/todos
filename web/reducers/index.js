import { CLEAR_ERROR, CREATE_TODO, DELETE_TODO, LOAD_TODOS, LOG_IN, LOG_OUT, REGISTER, UPDATE_TODO } from "../actions";

const initialState = {
    loading: false,
    user: undefined,
    todos: [],
    error: undefined,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                loading: action.payload.loading,
                user: action.payload.success,
                error: action.payload.error,
            };
        case LOG_IN:
        case LOG_OUT:
            return {
                ...state,
                loading: action.payload.loading,
                user: action.payload.success,
                error: action.payload.error
            };
        case LOAD_TODOS:
            return {
                ...state,
                loading: action.payload.loading,
                todos: action.payload.success,
                error: action.payload.error,
            };
        case CREATE_TODO:
            return {
                ...state,
                loading: action.payload.loading,
                todos: [...state.todos, ...action.payload.success],
                error: action.payload.error,
            };
        case DELETE_TODO:
            return {
                ...state,
                loading: action.payload.loading,
                todos: state.todos.filter(action.payload.success._id),
                error: action.payload.error,
            };
        case UPDATE_TODO:
            const updatedTodo = state.todos.map(todo => {
                return action.payload.success._id === todo._id
                    ? ({ ...action.payload.success })
                    : todo;
            });
            return {
                ...state,
                loading: action.payload.loading,
                todos: updatedTodo,
                error: action.payload.error,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: undefined,
            }
        default:
            return state;
    }
}

export default reducer;
