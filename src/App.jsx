import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos([...todos, task.trim()]);
    setTask("");
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setEditText("");
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
  };

  const saveEdit = () => {
    if (editText.trim() === "") return;
    const updated = [...todos];
    updated[editIndex] = editText.trim();
    setTodos(updated);
    setEditIndex(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") addTodo();
  };

  const handleEditKeyDown = (event) => {
    if (event.key === "Enter") saveEdit();
    if (event.key === "Escape") cancelEdit();
  };

  return (
    <div className="container">
      <div className="app-box">
        <h1 className="title">Todo List</h1>

        <div className="input-row">
          <input
            type="text"
            className="task-input"
            placeholder="Add tasks"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="add-btn btn" onClick={addTodo}>
            Add
          </button>
        </div>
        {
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={index} className="todo-item">
                {editIndex === index ? (
                  <div className="edit-row">
                    <input
                      className="edit-input"
                      value={editText}
                      onChange={(event) => setEditText(event.target.value)}
                      onKeyDown={handleEditKeyDown}
                      autoFocus
                    />
                    <button className="save-btn btn" onClick={saveEdit}>
                      Save
                    </button>
                    <button className="cancel-btn btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="input-row">
                    <span className="todo-text">
                      <span className="todo-num">{index + 1}. </span>
                      {todo}
                    </span>
                    <div className="action-btns">
                      <button
                        className="edit-btn btn"
                        onClick={() => startEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn btn"
                        onClick={() => deleteTodo(index)}
                      >
                        Del
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default App;
