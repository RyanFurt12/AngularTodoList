import { Todo } from "./todo";

export interface TodoList {
  id: number;
  name: string;
  lastID: number;
  todos: Todo[];
}