const request = require("supertest");
const repository = require("../../src/repository/todo");
const todoServiceFactory = require("../../src/service/todo");
const createServer = require("../../src/server");

let app;

beforeEach(() => {
  // Recreate a fresh server before each test
  const todoService = todoServiceFactory(repository);
  app = createServer(todoService);
});

describe("TODO API", () => {
  it("GET /api/todo should return todos", async () => {
    const res = await request(app).get("/api/todo");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.todos)).toBe(true);
  });

  it("POST /api/todo should validate missing task title", async () => {
    const res = await request(app).post("/api/todo").send({
      description:
        "As a user I want to be able to add a TODO item so I can track the things I want to do",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Title is required");
  });

  it("POST /api/todo should validate missing description", async () => {
    const res = await request(app).post("/api/todo").send({
      task: "Complete the user story",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Description is required");
  });

  it("POST /api/todo should validate invalid start date", async () => {
    const res = await request(app).post("/api/todo").send({
      task: "Complete the user story",
      description:
        "As a user I want to be able to add a TODO item so I can track the things I want to do",
      startDate: "not-a-date",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(
      "Invalid start date. Provide date in the format YYYY-MM-DD"
    );
  });

  it("POST /api/todo should validate invalid end date", async () => {
    const res = await request(app).post("/api/todo").send({
      task: "Complete the user story",
      description:
        "As a user I want to be able to add a TODO item so I can track the things I want to do",
      endDate: "not-a-date",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(
      "Invalid end date. Provide date in the format YYYY-MM-DD"
    );
  });

  it("POST /api/todo should validate start date after end date", async () => {
    const res = await request(app).post("/api/todo").send({
      task: "Complete the user story",
      description:
        "As a user I want to be able to add a TODO item so I can track the things I want to do",
      startDate: "2025-07-10",
      endDate: "2025-07-07",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Start date must be before end date");
  });

  it("POST /api/todo should create a todo successfully", async () => {
    const res = await request(app).post("/api/todo").send({
      task: "Complete the user story",
      description:
        "As a user I want to be able to add a TODO item so I can track the things I want to do",
      startDate: "2025-07-07",
      endDate: "2025-07-07",
    });
    expect(res.status).toBe(201);
    expect(res.body.task).toBe("Complete the user story");
    expect(res.body.description).toBe(
      "As a user I want to be able to add a TODO item so I can track the things I want to do"
    );
    expect(res.body.startDate).toBe("07/07/2025");
    expect(res.body.endDate).toBe("07/07/2025");
  });
});
