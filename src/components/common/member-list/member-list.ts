import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { isTrueProperty } from 'ionic-angular/util/util';

@Component({
  selector: 'member-list',
  templateUrl: 'member-list.html'
})
export class MemberListComponent {
  @ContentChild("itemEnd") itemEnd: TemplateRef<any>;

  @Input()
  get choice() {
    return this._choice;
  }
  set choice(val: boolean) {
    this._choice = isTrueProperty(val);
  }
  _choice = false;

  @Input() data: any[] = [];

  @Input()
  get selected() {
    return this._selected;
  }
  set selected(val) {
    this._selected = val;
  }
  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();
  _selected: any;

  constructor() {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

  onClick(item) {
    this.selected = item;
    this.selectedChange.emit(this.selected);
  }

}
