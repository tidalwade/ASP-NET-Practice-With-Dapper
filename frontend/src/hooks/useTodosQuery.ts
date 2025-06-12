import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../services/todoService";
import type { Todo } from "../types/todo";

export function useTodosQuery() {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await getTodos();
      return res.data;
    },
  });
}
