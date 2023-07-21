import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-priority-indicator',
  templateUrl: './priority-indicator.component.html',
  styleUrls: ['./priority-indicator.component.scss']
})
export class PriorityIndicatorComponent {
  /** Amount filled (0 - 100)% */
  @Input() set fill(value: number) {
    this.viewContainerRef.element.nativeElement.style.setProperty('--fill', `${value}%`);
  };
  @Input() size: number = 25
  
  constructor(public viewContainerRef: ViewContainerRef) {
    this.viewContainerRef.element.nativeElement.style.setProperty('--size', `${this.size}px`);
  }
}
