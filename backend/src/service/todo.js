const todoService = (repository) => {
  return {
    getTodos: async () => {
      return await repository.getTodos();
    },
    // add postTodo
    postTodo: async (todoData) => {
      return await repository.postTodo(todoData);
    },
  };
};

module.exports = todoService;
