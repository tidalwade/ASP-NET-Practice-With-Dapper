import axios from "axios";
import type { Todo } from "../types/todo";

const API_URL = "http://localhost:5229/api/todo";

export const getTodos = (): Promise<{ data: Todo[] }> => axios.get(API_URL);

export const addTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const res = await axios.post<Todo>(API_URL, todo);
  return res.data;
};

export const updateTodo = async ({
  id,
  todo,
}: {
  id: number;
  todo: Omit<Todo, "id">;
}): Promise<Todo> => {
  const res = await axios.put<Todo>(`${API_URL}/${id}`, todo);
  return res.data;
};

export const deleteTodo = async ({ id }: { id: number }): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
