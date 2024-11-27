// Angular modules
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Custom modules
import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';

// Interfaces
import ITodo from '../../models/todo';

// Components
import AddTodoComponent from '../../components/add-todo/add-todo.component';
import TodoCardComponent from '../../components/todo-card/todo-card.component';

// Services
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo-service/todo.service';
import TodoAllResponse, {
  TodoResponse,
} from '../../models/response/todo-response';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedAntDesignModule,
    AddTodoComponent,
    TodoCardComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todos: Array<ITodo> = [];
  addTodoText: string = '';
  paramId: string = '';

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);
  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.requestAllTodos().subscribe({
      next: (res: TodoAllResponse) => {
        this.todos = res.data;
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
      },
    });
  }

  handleDeleteTodo(id: string): void {
    this.todoService.requestDeleteTodo(id).subscribe({
      next: (res: TodoResponse) => {
        this.todos = this.todos.filter(
          (todo: ITodo) => todo._id !== res.data._id
        );
      },
      error: (error) => {
        console.error('Error deleting todos', error);
      },
    });
  }

  handleAddTodo(title: string): void {
    this.todoService.requestCreateTodo(title).subscribe({
      next: (res: TodoResponse) => {
        this.todos.push(res.data);
        this.addTodoText = '';
      },
      error: (error) => {
        console.error('Error creating todo', error);
      },
    });
  }
}
