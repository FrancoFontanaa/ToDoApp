import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/types';

@Pipe({
  name: 'getTotalTimeSpent',
  pure: false
})
export class GetTotalTimeSpentPipe implements PipeTransform {

  transform(Tasks: Task[]): number {
    return Tasks.map((task: Task) => task.timeSpent).reduce((a: number, b: number) => a + b, 0);
  }

}
