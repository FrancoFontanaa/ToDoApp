import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { Priority, Task } from './models/types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  tasksToRender: Task[] = [];
  priorityValues = Object.values(Priority);

  constructor(
    private dbService: DatabaseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dbService.getAllTasks().pipe(take(1), catchError(_error => of('ERROR-FETCHING-TASKS'))).subscribe((tasks: Task[] | string) => {
      if (tasks === 'ERROR-FETCHING-TASKS') {
        this.snackBar.open('Error fetching tasks, please reload.', 'Ok!', { duration: 1000 });
      } else if (typeof tasks === 'object') {
        this.tasks = this.tasksToRender = tasks;
        this.sortByPriority();
      }
    });
  }

  createTask(): void {
    this.dbService.createTask().pipe(take(1), catchError(_error => of('ERROR-CREATING-TASK'))).subscribe((task: Task | string) => {
      if (task === 'ERROR-CREATING-TASK') {
        this.snackBar.open('Error creating task, please try again.', 'Ok!', { duration: 1000 });
      } else if (typeof task === 'object') {
        this.tasks.unshift(task);
      }
    });
  }

  removeTask(id: string) {
    console.log("removeTask")
    this.dbService.deleteTask(id).pipe(take(1), catchError(_error => of('ERROR-REMOVING-TASK'))).subscribe((response: string) => {
      if (response === 'ERROR-REMOVING-TASK') {
        this.snackBar.open('Error removing task, please try again.', 'Ok!', { duration: 1000 });
      } else if (typeof response === 'object') {
        this.snackBar.open('Task removed.', 'Ok!', { duration: 1000 });
        this.tasks = this.tasksToRender = this.tasks.filter((task: Task) => task.id !== id);;
      }
    });
  }

  autosaveTaskTimer: any;
  autosaveTask(task: Task): void {
    if (this.autosaveTaskTimer) clearTimeout(this.autosaveTaskTimer);
    this.autosaveTaskTimer = setTimeout(() => {
      if (this.priorityValues.indexOf(task.priority) !== 0 && task.text.length > 30) {
        this.snackBar.open('Failed autosave, only high priority tasks can have more than 30 characters.', 'Ok!', { duration: 1000 });
      } else {
        this.dbService.updateTask(task).pipe(take(1), catchError(_error => of('ERROR-AUTOSAVING-TASK'))).subscribe((response: string) => {
          if (response === 'ERROR-AUTOSAVING-TASK') {
            this.snackBar.open('Error autosaving task, please try again.', 'Ok!', { duration: 1000 });
          } else if (typeof response === 'object') {
            this.snackBar.open('Task autosaved.', 'Ok!', { duration: 1000 });
            this.sortByPriority();
          }
        });
      }

    }, 1000)
  }

  matchTasksWithSearchTerm(searchTerm: string) {
    if (searchTerm === '') {
      this.tasksToRender = this.tasks;
    } else {
      this.tasksToRender = this.tasks.filter((task: Task) => task.text.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  }

  private sortByPriority() {
    this.tasks.sort((a: Task, b: Task) => this.priorityValues.indexOf(a.priority) - this.priorityValues.indexOf(b.priority))
  }
}
