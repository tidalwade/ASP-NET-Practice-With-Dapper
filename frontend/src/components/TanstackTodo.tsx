import { useTodoMutations } from "../hooks/useTodoMutations";
import { useTodosQuery } from "../hooks/useTodosQuery";
import { useState } from "react";
import type { Todo } from "../types/todo";

export default function TanstackTodo() {
  const { add, update, remove } = useTodoMutations();
  const [newTitle, setNewTitle] = useState("");

  const { data: todos = [], isPending } = useTodosQuery();

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    add.mutate({ title: newTitle, isComplete: false });
    setNewTitle("");
  };

  const handleToggle = (todo: Todo) => {
    update.mutate({
      id: todo.id,
      todo: { title: todo.title, isComplete: !todo.isComplete },
    });
  };

  const handleBlur = (todo: Todo, newTitle: string) => {
    if (newTitle !== todo.title) {
      update.mutate({
        id: todo.id,
        todo: { title: newTitle, isComplete: todo.isComplete },
      });
    }
  };

  const handleDelete = (id: number) => {
    remove.mutate({ id });
  };

  return (
    <div className="w-[500px]">
      <h2 className="text-xl font-semibold mb-4 text-center">
        TanStack Query Version
      </h2>
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded-lg px-3 py-2 w-full"
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

      {isPending ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2 shadow-sm"
            >
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => handleToggle(todo)}
                className="accent-blue-500"
              />
              <input
                className="border rounded px-2 py-1 w-full"
                defaultValue={todo.title}
                onBlur={(e) => handleBlur(todo, e.target.value)}
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
      )}
    </div>
  );
}
