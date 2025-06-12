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
    <div>
      <h2>TanStack Query Version</h2>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New todo title"
      />
      <button onClick={handleAdd}>Add</button>

      {isPending ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo: Todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => handleToggle(todo)}
              />
              <input
                defaultValue={todo.title}
                onBlur={(e) => handleBlur(todo, e.target.value)}
              />
              <button onClick={() => handleDelete(todo.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
