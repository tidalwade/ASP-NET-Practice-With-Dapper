import { useEffect, useState } from "react";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";
import type { Todo } from "../types/todo";

export default function ClassicTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await addTodo({ title: newTitle, isComplete: false });
    setNewTitle("");
    fetchTodos();
  };

  const handleCompletionToggle = async (todo: Todo) => {
    await updateTodo({
      id: todo.id,
      todo: { title: todo.title, isComplete: !todo.isComplete },
    });
    fetchTodos();
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleTitleBlur = async (todo: Todo) => {
    await updateTodo({
      id: todo.id,
      todo: { title: todo.title, isComplete: todo.isComplete },
    });
    fetchTodos();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo({ id });
    fetchTodos();
  };

  return (
    <div>
      <h2>Classic Version (useState/useEffect)</h2>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New todo title"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => handleCompletionToggle(todo)}
            />
            <textarea
              value={todo.title}
              onChange={(e) => handleTitleChange(todo.id, e.target.value)}
              onBlur={() => handleTitleBlur(todo)}
            />
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
