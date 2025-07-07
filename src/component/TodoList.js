import React, { Component } from "react";
import { fetchTodos } from "../actions";
import { connect } from "react-redux";

class TodoList extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const { todos } = this.props.data || {};
    return (
      <ul className="todo-list">
        {todos && todos.length
          ? todos.map((todo, index) => (
              <li key={`todo-${index}`} className="todo-item">
                <strong>{todo.task}</strong>
                <br />
                {todo.description}
                <br />
                <small>
                  Start: {todo.startDate || "-"} | End: {todo.endDate || "-"}
                </small>
              </li>
            ))
          : "No todos, yay!"}
      </ul>
    );
  }
}

const mapStateToProps = ({ data = {}, isLoadingData = false }) => ({
  data,
  isLoadingData,
});
export default connect(mapStateToProps, {
  fetchTodos,
})(TodoList);
