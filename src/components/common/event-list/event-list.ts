import { Component, Input } from '@angular/core';

@Component({
  selector: 'event-list',
  templateUrl: 'event-list.html'
})
export class EventListComponent {

  @Input() data: any[] = [];

  articleType = "event";

  constructor() {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
