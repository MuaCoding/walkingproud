import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'load-more',
  templateUrl: 'load-more.html'
})
export class LoadMoreComponent {

  loading = false;

  @Output() loadMore = new EventEmitter<LoadMoreComponent>();

  constructor() {
  }

  onClick() {
    this.loading = true;
    this.loadMore.emit(this);
  }

  complete() {
    this.loading = false;
  }

}
