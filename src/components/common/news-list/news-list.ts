import { Component, Input } from '@angular/core';

@Component({
  selector: 'news-list',
  templateUrl: 'news-list.html'
})
export class NewsListComponent {

  @Input() data: any[] = [];

  articleType = "news";

  constructor() {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
