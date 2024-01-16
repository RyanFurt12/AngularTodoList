import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../todo';
import { TodoService } from '../../services/todo.service';
import { TodoList } from '../../todoList';
import { CompartilharDadosService } from '../../services/compartilhar-dados.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})

export class TodoListComponent {
  @Input()
  id!: number;
  todoList: TodoList | undefined;
  newTodoText = '';

  constructor(private todoService: TodoService, private compartilharService:CompartilharDadosService) {
    this.getTodos();
  }

  getTodos(): void {
    this.todoList = this.todoService.getTodos(this.id);
    if(this.todoList == undefined) setTimeout(() => {this.getTodos();}, 200);
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

  changeTitle():void {
    let newTitle:string = prompt("Qual o novo titulo? ")??"ToDo-List";
    newTitle = newTitle == "" ? "ToDo-List" : newTitle;
    
    if(this.todoList){
      this.todoList.name = newTitle;
      this.todoService.updateListTitle(this.todoList);
    } 
  }
}
