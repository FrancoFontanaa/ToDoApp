import { AfterContentInit, Component, ContentChildren, Input, OnDestroy, QueryList } from '@angular/core';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss']
})
export class TasksContainerComponent implements AfterContentInit, OnDestroy {

  @Input() title: string = 'Tasks';
  @Input() expanded: boolean = false;

  @ContentChildren(TaskComponent, { descendants: true }) tasks: QueryList<TaskComponent> | undefined;

  tasksArray: TaskComponent[] = [];
  private subscription: any;

  ngAfterContentInit(): void {
    this.tasksArray = this.tasks?.toArray() || [];
    this.subscription = this.tasks?.changes.subscribe((tasks) => {
      this.tasksArray = tasks
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
