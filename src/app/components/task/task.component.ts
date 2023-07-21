import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Priority, Task, TaskState } from 'src/app/models/types';
import { RoundThirthyMinutesPipe } from 'src/app/pipes/round-thirthy-minutes.pipe';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [RoundThirthyMinutesPipe]
})
export class TaskComponent implements OnInit {
  priorityValues = Object.values(Priority);
  timerRunning: boolean = false;
  timerInterval: any;
  localTimeSpent: number = 0;
  maxLocalTimeSpent: number = 30 * 60;
  maxLengthByPriority: { [key: string]: number } = {
    high: 9999,
    medium: 30,
    low: 30
  }

  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<void>();
  @Output() changeState = new EventEmitter<TaskState>();
  @Output() changePriority = new EventEmitter<Priority>();
  @Output() changeText = new EventEmitter<string>();
  @Output() stopTimer = new EventEmitter<number>();

  constructor(
    private snackBar: MatSnackBar,
    private roundThirtyMinutes: RoundThirthyMinutesPipe
  ) { }

  ngOnInit(): void {
    this.localTimeSpent = this.task.timeSpent - this.roundThirtyMinutes.transform(this.task.timeSpent);
  }

  toggleTimer(): void {
    if (this.timerRunning) {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.stopTimer.emit(this.roundThirtyMinutes.transform(this.task.timeSpent) + this.localTimeSpent);
      if (this.localTimeSpent === this.maxLocalTimeSpent) this.localTimeSpent = 0;
    } else {
      this.localTimeSpent = this.task.timeSpent - this.roundThirtyMinutes.transform(this.task.timeSpent);
      this.timerInterval = setInterval(() => {
        this.localTimeSpent++;
        if (this.localTimeSpent >= this.maxLocalTimeSpent) {
          this.toggleTimer();
          this.snackBar.open(`Timer stopped for task "${this.task.text.slice(0, 10)}...", reached 30 minutes.`, 'Ok!', { duration: 5000 });
        }
      }, 1000);
    }
    this.timerRunning = !this.timerRunning;
  }
}
