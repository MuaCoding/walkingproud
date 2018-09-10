import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'my-progress',
  templateUrl: 'my-progress.html'
})
export class MyProgressComponent {

  @Input() value: number = 0;
  @Input() max: number = 100;

  percentage: number = 0.00;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.percentage = Math.round((this.value / this.max) * 100);
  }

}
