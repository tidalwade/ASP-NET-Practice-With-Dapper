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
      <h2 className="text-xl font-semibold mb-4 text-center">
        Classic Version (useState/useEffect)
      </h2>
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 w-full"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New todo title"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          onClick={handleAdd}
        >
          <span className="text-lg font-bold">+</span>
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2 shadow-sm"
          >
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => handleCompletionToggle(todo)}
              className="accent-blue-500"
            />
            <textarea
              className="border rounded px-2 py-1 resize-none w-64"
              value={todo.title}
              onChange={(e) => handleTitleChange(todo.id, e.target.value)}
              onBlur={() => handleTitleBlur(todo)}
              rows={1}
            />
            <button
              className="text-red-500 hover:text-red-700 text-lg"
              onClick={() => handleDelete(todo.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
