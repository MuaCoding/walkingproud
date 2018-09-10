import { Component, Input } from '@angular/core';
import { isTrueProperty } from 'ionic-angular/util/util';

@Component({
  selector: 'empty-state',
  templateUrl: 'empty-state.html'
})
export class EmptyStateComponent {

  @Input()
  get completed() {
    return this._completed;
  }
  set completed(val: boolean) {
    this._completed = isTrueProperty(val);
  }

  _completed = false;

  constructor() {
  }

}
