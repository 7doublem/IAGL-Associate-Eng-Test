const express = require("express");
const cors = require("cors");
const repository = require("./repository/todo");
const todoService = require("./service/todo")(repository);

const server = () => {
  const server = express();
  server.use(express.json());
  server.use(cors());

  server.get("/api/todo", async (req, res) => {
    res.json(await todoService.getTodos());
  });

  // POST /api/todo

  server.post("/api/todo", async (req, res) => {
    try {
      const { task, description, startDate, endDate } = req.body;

      // Title validation
      if (!task || typeof task !== "string" || task.trim() === "") {
        return res.status(400).send({ error: "Title is required" });
      }

      // Description validation
      if (
        !description ||
        typeof description !== "string" ||
        description.trim() === ""
      ) {
        return res.status(400).send({ error: "Description is required" });
      }

      // Start date validation
      if (startDate && isNaN(Date.parse(startDate))) {
        return res.status(400).send({
          error: "Invalid start date. Provide date in the format YYYY-MM-DD",
        });
      }

      // End date validation
      if (endDate && isNaN(Date.parse(endDate))) {
        return res.status(400).send({
          error: "Invalid end date. Provide date in the format YYYY-MM-DD",
        });
      }

      // Start date must be before end date
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        return res
          .status(400)
          .send({ error: "Start date must be before end date" });
      }

      // Create todo
      const newTodo = await todoService.postTodo({
        task: task.trim(),
        description: description.trim(),
        startDate,
        endDate,
      });
      res.status(201).send(newTodo);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  return server;
};

module.exports = server;
