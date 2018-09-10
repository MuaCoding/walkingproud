import { Component, Input } from '@angular/core';
import { UtilityProvider } from '../../../providers/utility/utility';

@Component({
  selector: 'user-activity-list',
  templateUrl: 'user-activity-list.html'
})
export class UserActivityListComponent {

  @Input() data: any[] = [];

  constructor(public utility: UtilityProvider) {
  }

  gotoActivity(item) {
    this.utility.gotoSubstation(item.id);
  }

  gotoTeamList(item) {
    this.utility.gotoSubstation(item.id, "team-list");
  }

  gotoTeamItem(item) {
    this.utility.gotoSubstation(item.id, "team-item", { id: item.team.id });
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
