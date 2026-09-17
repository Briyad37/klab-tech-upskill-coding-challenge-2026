"use client";

import { FormEvent, useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    setLoading(true);

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
      }),
    });

    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setLoading(false);

    fetchTasks();
  };

  const toggleStatus = async (task: Task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: task.status === "PENDING" ? "COMPLETED" : "PENDING",
      }),
    });

    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  const filteredTasks =
    filter === "ALL"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <main className="container">
      <h1>Task Management System</h1>

      <form onSubmit={createTask} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">Low Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="HIGH">High Priority</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter("ALL")}>All</button>
        <button onClick={() => setFilter("PENDING")}>Pending</button>
        <button onClick={() => setFilter("COMPLETED")}>Completed</button>
      </div>

      <section className="tasks">
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <article key={task.id} className="task-card">
              <div>
                <h2>{task.title}</h2>
                <p>{task.description}</p>

                <small>
                  Priority: {task.priority} | Status: {task.status}
                </small>
              </div>

              <div className="actions">
                <button onClick={() => toggleStatus(task)}>
                  {task.status === "PENDING"
                    ? "Mark Completed"
                    : "Mark Pending"}
                </button>

                <button onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}