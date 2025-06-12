import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, updateTodo, deleteTodo } from "../services/todoService";
import type { Todo } from "../types/todo";

type CreateTodo = Omit<Todo, "id">;
type UpdateTodoArgs = { id: number; todo: CreateTodo };
type DeleteTodoArgs = { id: number };

export function useTodoMutations() {
  const queryClient = useQueryClient();

  const invalidateTodos = () =>
    queryClient.invalidateQueries({ queryKey: ["todos"] });

  const add = useMutation<Todo, unknown, CreateTodo>({
    mutationFn: addTodo,
    onSuccess: invalidateTodos,
  });

  const update = useMutation<Todo, unknown, UpdateTodoArgs>({
    mutationFn: updateTodo,
    onSuccess: invalidateTodos,
  });

  const remove = useMutation<void, unknown, DeleteTodoArgs>({
    mutationFn: deleteTodo,
    onSuccess: invalidateTodos,
  });

  return {
    add,
    update,
    remove,
  };
}
