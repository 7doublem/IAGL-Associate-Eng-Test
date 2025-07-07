import React from "react";
import TodoList from "./component/TodoList";
import Todo from "./component/Todo";
import "./styles.css";

export default function TodoApp() {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <Todo />
      <TodoList />
    </div>
  );
}