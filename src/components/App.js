import React, { useState } from "react";
import './../styles/App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { id: Date.now(), text: task }]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: editText } : t
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <div>
      {/* Add Task Section */}
      <div className="add_tasks_section">
         <textarea
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
        ></textarea>
        <button onClick={addTask}>Add</button>
      </div>

      {/* Tasks Section */}
      <div className="tasks_section">
        {tasks.map((t) => (
          <div className="task" key={t.id}>
            {editId === t.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="save"
                  onClick={() => saveTask(t.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{t.text}</span>
                <button
                  className="edit"
                  onClick={() => startEdit(t.id, t.text)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => deleteTask(t.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
