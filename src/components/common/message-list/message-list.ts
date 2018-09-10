import { Component, Input } from '@angular/core';

@Component({
  selector: 'message-list',
  templateUrl: 'message-list.html'
})
export class MessageListComponent {

  @Input() data: any[] = [];

  constructor() {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
