import axios from "axios";
import { FETCH_TODOS, ADD_TODO } from "./types";

export function fetchTodos() {
  return function (dispatch) {
    return axios.get("http://localhost:9091/api/todo").then(({ data }) => {
      dispatch(setTodos(data));
    });
  };
}

function setTodos(data) {
  return {
    type: FETCH_TODOS,
    payload: data,
  };
}

// POST a new todo to the backend
export function createTodo(todo) {
  return function (dispatch) {
    // Make POST request
    return axios
      .post("http://localhost:9091/api/todo", todo)
      .then(({ data }) => {
        // dispatch to update Redux
        dispatch(addTodo(data));
      });
  };
}

// Add new todo to the state
function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}
