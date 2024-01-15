import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoService } from './services/todo.service';
import { TodoList } from './todoList';
import { CompartilharDadosService } from './services/compartilhar-dados.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, TodoListComponent]
})
export class AppComponent implements OnInit{
  title = 'AngularTodoList';
  todoLists: TodoList[] = [];

  constructor(private todoService: TodoService, private compartilharService:CompartilharDadosService) {
    this.getTodos();
  }

  ngOnInit(): void {
    this.compartilharService.itemDeletado.subscribe(() => {
      this.getTodos();
    });
  }

  getTodos(){
    this.todoLists = this.todoService.getList();
    console.log("asndjksad");
  }

  addList(){
    let newList:TodoList = {
      id: 0,
      name: "ToDo-List",
      lastID: 0,
      todos: [],
    }

    this.todoService.addList(newList);
    this.getTodos();
  }


}
