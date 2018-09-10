import { Component, Input } from '@angular/core';

@Component({
  selector: 'pay-record-list',
  templateUrl: 'pay-record-list.html',
})
export class PayRecordListComponent {

  @Input() data: any[] = [];

  constructor() {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
