import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/types';

@Pipe({
  name: 'filterByProperty',
  pure: false
})
export class FilterByPropertyPipe implements PipeTransform {

  transform(tasks: Task[], propertyName: keyof Task, propertyValue: any): Task[] {
    return tasks.filter((task: Task) => task[propertyName] === propertyValue);
  }

}
