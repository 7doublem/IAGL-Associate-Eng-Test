// Updated todo task example to follow structure of future posted tasks
let todoList = {
  todos: [
    {
      id: 1,
      task: "This is a todo example",
      description: "Example description",
      startDate: "07/07/2025",
      endDate: "08/07/2025",
      createdAt: new Date().toLocaleDateString("en-GB"),
      dateCompleted: null,
    },
  ],
};

// IDs starting for 2 since example id is 1

let idCounter = 2;

module.exports = {
  // Get all todos
  getTodos: () => Promise.resolve(todoList),

  // Post new todo
  postTodo: (todoData) => {
    const newTodo = {
      id: idCounter++,
      task: todoData.task,
      description: todoData.description,
      // Format date to uk format if provided, otherwise null
      startDate: todoData.startDate
        ? new Date(todoData.startDate).toLocaleDateString("en-GB")
        : null,
      endDate: todoData.endDate
        ? new Date(todoData.endDate).toLocaleDateString("en-GB")
        : null,
      createdAt: new Date().toLocaleDateString("en-GB"),
      dateCompleted: null,
    };
    todoList.todos.push(newTodo);

    return Promise.resolve(newTodo);
  },
};
