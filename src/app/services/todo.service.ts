import { Injectable } from '@angular/core';
import { Todo } from '../todo';
import { TodoList } from '../todoList';

@Injectable({
  providedIn: 'root'
})

export class TodoService {  
  private todoList: TodoList[] = [];

  constructor() {
    this.loadTodos();
  }

  addList(list:TodoList):void{
    list.id = this.todoList.length;
    this.todoList.push(list);

    this.saveTodos();
  }

  deleteList(index:number): void{
    this.todoList = this.todoList.filter(todo => todo.id !== index);
    this.todoList.forEach((list, index) => list.id = index);
    
    this.saveTodos();
  }

  getList(): TodoList[] {
    return this.todoList;
  }

  getTodos(index:number): TodoList {
    return this.todoList[index];
  }
  
  updateListTitle(list:TodoList):void{
    this.todoList[list.id].name = list.name;
    
    this.saveTodos();
  }
  
  addTodo(index:number, todo: Todo): void {
    todo.id = ++this.todoList[index].lastID;    
    this.todoList[index].todos.push(todo);

    this.saveTodos();
  }

  deleteTodo(index:number, todoId: number): void {
    this.todoList[index].todos = this.todoList[index].todos.filter(todo => todo.id !== todoId);
    
    this.saveTodos();
  }

  markAsCompleted(index:number, todoId: number): void {
    const todo = this.todoList[index].todos.find(todo => todo.id === todoId);
    if (todo) todo.completed = todo.completed ? false : true;     

    this.saveTodos();
  }

  deleteAllTodo(index:number,): void {
    this.todoList[index].todos = [];
    this.todoList[index].lastID = 0;
    this.saveTodos();
  }

  private saveTodos(): void {
    localStorage.setItem('todolist', JSON.stringify(this.todoList));
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem('todolist');
    this.todoList = storedTodos ? JSON.parse(storedTodos) : [];
  }
}
