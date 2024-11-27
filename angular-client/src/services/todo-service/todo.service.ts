// Angular modules
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaces
import TodoAllResponse, {
  TodoResponse,
} from '../../models/response/todo-response';

// Services
import { HttpClient } from '@angular/common/http';

// Environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  requestAllTodos(): Observable<TodoAllResponse> {
    return this.http.get<TodoAllResponse>(`${environment.api}/todos`);
  }

  requestCreateTodo(title: string): Observable<TodoResponse> {
    return this.http.post<TodoResponse>(`${environment.api}/todos/create`, {
      title,
    });
  }

  requestDeleteTodo(id: string): Observable<TodoResponse> {
    return this.http.delete<TodoResponse>(`${environment.api}/todos/${id}`);
  }
}
