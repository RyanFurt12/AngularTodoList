import { Injectable } from '@angular/core';
import { Todo } from '../todo';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private todos: Todo[] = [];
  private lastId: number = 0;

  constructor() {
    this.loadTodos();
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo): void {
    todo.id = ++this.lastId;    
    this.todos.push(todo);
    this.saveTodos();
  }

  deleteTodo(todoId: number): void {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
    this.saveTodos();
  }

  markAsCompleted(todoId: number): void {
    const todo = this.todos.find(todo => todo.id === todoId);
    if (todo) {
      todo.completed = todo.completed ? false : true;     
    }
    this.saveTodos();
  }

  deleteAllTodo(): void {
    this.todos = [];
    this.lastId = 0;
    this.saveTodos();
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('lastId', this.lastId.toString());
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem('todos');
    const storedLastId = localStorage.getItem('lastId');

    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    this.lastId = storedLastId ? parseInt(storedLastId, 10) : 0;
  }
}
