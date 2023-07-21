import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundThirthyMinutes'
})
export class RoundThirthyMinutesPipe implements PipeTransform {

  transform(time: number): number {
    return Math.floor(time / 1800) * 1800;
  }

}
