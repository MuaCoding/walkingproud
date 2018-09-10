import { Component, Input  } from '@angular/core';

@Component({
  selector: 'activity-countdown',
  templateUrl: 'activity-countdown.html'
})
export class ActivityCountdownComponent {

  @Input() time: any = {};

  constructor() {
  }

}
