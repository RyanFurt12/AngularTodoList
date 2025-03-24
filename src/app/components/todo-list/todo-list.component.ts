import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../todo';
import { TodoService } from '../../services/todo.service';
import { TodoList } from '../../todoList';
import { CompartilharDadosService } from '../../services/compartilhar-dados.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() id!: number;
  todoList: TodoList | undefined;
  newTodoText = '';
  isEditing = false;
  newTitle = '';
  @ViewChild('editInput') editInput!: ElementRef;

  constructor(
    private todoService: TodoService,
    private compartilharService: CompartilharDadosService
  ) {
    this.getTodos();
  }

  getTodos(): void {
    this.todoList = this.todoService.getTodos(this.id);
    if (this.todoList == undefined) setTimeout(() => { this.getTodos(); }, 200);
  }

  addTodo(): void {
    if (this.newTodoText.trim()) {
      const newTodo: Todo = {
        id: 0,
        text: this.newTodoText,
        completed: false,
      };
      this.todoService.addTodo(this.id, newTodo);
      this.newTodoText = '';
      this.getTodos();
    }
  }

  deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(this.id, todoId);
    this.getTodos();
  }

  markAsCompleted(todoId: number): void {
    this.todoService.markAsCompleted(this.id, todoId);
    this.getTodos();
  }

  deleteAllTodo(): void {
    this.todoService.deleteList(this.id);
    this.compartilharService.emitirItemDeletado();
  }

  toggleEditTitle(): void {
    this.isEditing = true;
    this.newTitle = this.todoList?.name ?? ''; 
    setTimeout(() => {
      this.adjustWidthTitleInput();
      this.editInput.nativeElement.focus(); 
    }, 0);
  }

  adjustWidthTitleInput(): void {
    const input = this.editInput.nativeElement;
    const value = input.value;
    input.style.width = `${value.length+1}ch`;
  }

  saveTitle(): void {
    if (this.newTitle.trim()) {
      if (this.todoList) {
        this.todoList.name = this.newTitle;
        this.todoService.updateListTitle(this.todoList);
      }
    }
    this.isEditing = false;
  }
}
