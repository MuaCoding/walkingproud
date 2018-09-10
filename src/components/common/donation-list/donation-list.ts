import { Component, Input } from '@angular/core';

@Component({
  selector: 'donation-list',
  templateUrl: 'donation-list.html'
})
export class DonationListComponent {

  @Input() data: any[] = [];

  constructor() {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
