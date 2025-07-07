import React, { useState } from "react";
import { connect } from "react-redux";
import { createTodo } from "../actions";

function Todo({ createTodo }) {
  const [form, setForm] = useState({
    task: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validation for task
    if (!form.task || typeof form.task !== "string" || form.task.trim() === "") {
      setError("Task is required");
      return;
    }

    // Validation for description
    if (!form.description || typeof form.description !== "string" || form.description.trim() === "") {
      setError("Description is required");
      return;
    }

    // Validate start date format if provided
    if (form.startDate && isNaN(Date.parse(form.startDate))) {
      setError("Start Date must be a valid date in YYYY-MM-DD format");
      return;
    }

    // Validate end date format if provided
    if (form.endDate && isNaN(Date.parse(form.endDate))) {
      setError("End Date must be a valid date in YYYY-MM-DD format");
      return;
    }

    // If both dates are present, start <= end
    if (
      form.startDate &&
      form.endDate &&
      new Date(form.startDate) > new Date(form.endDate)
    ) {
      setError("Start Date cannot be after End Date");
      return;
    }

    setError("");

    createTodo(form).then(() => {
      setForm({
        task: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <input
          type="text"
          name="task"
          placeholder="Task"
          value={form.task}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="startDate"
          placeholder="Start Date (YYYY-MM-DD)"
          value={form.startDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="endDate"
          placeholder="End Date (YYYY-MM-DD)"
          value={form.endDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="add-todo">
        Add Todo
      </button>
    </form>
  );
}

export default connect(null, { createTodo })(Todo);
