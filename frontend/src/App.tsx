import { useEffect, useState } from "react";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./services/todoService";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await addTodo({ title: newTitle, isComplete: false });
    setNewTitle("");
    fetchTodos();
  };

  const handleCompletionToggle = async (todo: any) => {
    await updateTodo(todo.id, {
      ...todo,
      isComplete: !todo.isComplete,
    });
    fetchTodos();
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    setTodos((prevTodos: any) =>
      prevTodos.map((todo: any) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleTitleBlur = async (todo: any) => {
    await updateTodo(todo.id, {
      ...todo,
      title: todo.title,
    });
  };

  const handleDelete = async (id: any) => {
    await deleteTodo(id);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Todo List</h1>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New todo title"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => handleCompletionToggle(todo)}
            />
            <textarea
              value={todo.title}
              onChange={(e) => handleTitleChange(todo.id, e.target.value)}
              onBlur={() => handleTitleBlur(todo)} // update on blur
            />
            {/* <button onClick={() => handleUpdatedTitle(todo)}>Update</button> */}
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
