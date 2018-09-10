import { Component, Input } from '@angular/core';

@Component({
  selector: 'ranking',
  templateUrl: 'ranking.html'
})
export class RankingComponent {

  @Input() data: any[] = [];

  constructor() {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
