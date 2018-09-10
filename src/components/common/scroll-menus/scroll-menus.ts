import { Component, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'scroll-menus',
  templateUrl: 'scroll-menus.html'
})
export class ScrollMenusComponent {

  @ViewChild(Slides) menus: Slides;

  @Input() slides: Slides;
  @Input() index: number = 0;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  titles = [];

  constructor() {
  }

  ngOnInit() {
    this.setSlides();
    this.getTitles();
  }

  ngOnChanges(changes: SimpleChanges) {
    const index = changes["index"];
    if (index) {
      if (index.currentValue) {
        try {
          this.slideTo(this.index);
        }
        catch (ex) { }
      }
    }
  }

  setSlides() {
    const slides = this.slides;

    slides.onlyExternal = true;
    slides.keyboardControl = false;

    slides.update();
    slides.resize();
  }

  getTitles() {
    const dom = this.slides.container.children[0].children;

    for (let i = 0; i < dom.length; i++) {
      const item: any = dom.item(i);
      const title = item.title ? item.title : ("标签" + (i + 1));

      this.titles.push(title);
    }

    this.change.emit(this.index);
  }

  trackByFn(index: number, item) {
    return index;
  }

  selectChanged(index) {
    this.index = index;
    this.slideTo(parseInt(index));
  }

  slideTo(index: number) {
    this.menus.slideTo(index);
    this.slides.slideTo(index, 0);
    this.change.emit(this.index);
  }

}
