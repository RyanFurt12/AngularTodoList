import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})

export class TodoListComponent {
  todos: Todo[] = [];
  newTodoText = '';

  constructor(private todoService: TodoService) {
    this.getTodos();
  }

  getTodos(){
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (this.newTodoText.trim()) {
      const newTodo: Todo = {
        id: 0,
        text: this.newTodoText,
        completed: false,
      };
      this.todoService.addTodo(newTodo);
      this.newTodoText = '';
      this.getTodos();
    }
  }

  deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId);
    this.getTodos();
  }

  markAsCompleted(todoId: number): void {
    this.todoService.markAsCompleted(todoId);
    this.getTodos();
  }

  deleteAllTodo(): void {
    this.todoService.deleteAllTodo();
    this.getTodos();
  }
}
