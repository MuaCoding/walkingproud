import { Component, Input } from '@angular/core';
import { UtilityProvider } from '../../../providers/utility/utility';

@Component({
  selector: 'team-list',
  templateUrl: 'team-list.html'
})
export class TeamListComponent {

  @Input() data: any[] = [];

  constructor(public utility: UtilityProvider) {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
