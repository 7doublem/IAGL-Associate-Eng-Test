const repository = require("../../src/repository/todo");

describe("TODO repository", () => {
  it("should return the todo list", async () => {
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
    const actual = await repository.getTodos();
    expect(actual).toEqual(expected);
  });
});
