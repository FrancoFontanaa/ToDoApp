import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {
  transform(value: number): unknown {
    const hs = Math.floor(value / 3600).toString().padStart(2, '0');
    const m = Math.floor((value % 3600) / 60).toString().padStart(2, '0');
    const s = (value % 60).toString().padStart(2, '0'); 
    return `${hs}:${m}:${s}s`;
  }
}
