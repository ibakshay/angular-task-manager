import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpHeaders = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )
};

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    const response = this.http.put<Task>(url, task, httpHeaders);
    return response;
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpHeaders);
  }
}
