describe("TODO Service", () => {
  it("should be able to get todos from repository", async () => {
    const expected = {
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
    const todoRepository = {
      getTodos: async () => Promise.resolve(expected),
    };

    const todoService = require("../../src/service/todo")(todoRepository);
    const actual = await todoService.getTodos();
    expect(actual).toEqual(expected);
  });
});
