import { Injectable } from '@angular/core';
import { Priority, Task } from '../models/types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  createTask(): Observable<any> {
    return this.http.post(
      environment.endpoint + '/tasks',
      <Task>{
        id: this.generateRandomId(),
        text: 'New task',
        priority: Priority.high,
        state: 'pending',
        timestamp: Date.now(),
        timeSpent: 0
      }
    )
  }

  updateTask(task: Task): Observable<any> {
    return this.http.patch(
      environment.endpoint + '/tasks/' + task.id,
      <Task>{
        text: task.text,
        priority: task.priority,
        state: task.state,
        timestamp: task.timestamp,
        timeSpent: task.timeSpent
      }
    )
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(environment.endpoint + '/tasks/' + id);
  }

  getAllTasks(): Observable<any> {
    return this.http.get(environment.endpoint + '/tasks');
  }

  generateRandomId(): string {
    return Math.floor(Math.random() * Date.now()).toString(16);
  }
}
