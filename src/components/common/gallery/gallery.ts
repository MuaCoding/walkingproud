import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';
import { isTrueProperty } from 'ionic-angular/util/util';

@Component({
  selector: 'gallery',
  templateUrl: 'gallery.html'
})
export class GalleryComponent {
  @ViewChild(Slides) slides: Slides;

  @Input() data: Array<any>;

  @Input()
  get loop() {
    return this._loop;
  }
  set loop(val: boolean) {
    this._loop = isTrueProperty(val);
  }

  _loop = false;

  @Input()
  get focus() {
    return this._focus;
  }
  set focus(val: boolean) {
    this._focus = isTrueProperty(val);
  }

  _focus = false;

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    if (this.focus) {
      this.slides.spaceBetween = "-24";
    }
  }

  ngOnChanges() {
    if (this.data) {
      if (this.data.length > 2 && this.loop) {
        this.slides.loop = true;
      }
    }
  }

  onClick(index) {
    this.selected.emit(index);
  }

  trackByFn(index: number, item) {
    return index;
  }

}
