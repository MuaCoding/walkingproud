import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-list',
  templateUrl: 'project-list.html'
})
export class ProjectListComponent {

  @Input() data: any[] = [];

  constructor() {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
