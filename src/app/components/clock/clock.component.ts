import { Component, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnChanges {
  @Input() size: number = 36;
  @Input() thickness: number = 3;
  @Input() fill: number = 50;

  radius: number = 0;

  constructor(private viewContainerRef: ViewContainerRef) {}
  
  ngOnChanges(): void {
    this.radius = this.size / 2 - this.thickness / 2;
    this.viewContainerRef.element.nativeElement.style.setProperty('--size', this.size);
    this.viewContainerRef.element.nativeElement.style.setProperty('--thickness', this.thickness);
    this.viewContainerRef.element.nativeElement.style.setProperty('--radius', this.radius);
    this.viewContainerRef.element.nativeElement.style.setProperty('--fill', 99.9 - this.fill);
  }
}
