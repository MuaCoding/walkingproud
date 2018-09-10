import { Component, Input } from '@angular/core';
import { UtilityProvider } from '../../../providers/utility/utility';

@Component({
  selector: 'activity-list',
  templateUrl: 'activity-list.html'
})
export class ActivityListComponent {

  @Input() data: any[] = [];

  constructor(public utility: UtilityProvider) {
  }

  gotoActivity(item) {
    this.utility.gotoSubstation(item.id);
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
