import { Component, Input, Output, EventEmitter, SimpleChanges, Renderer2, ElementRef } from '@angular/core';
import { Slides, SegmentButton } from 'ionic-angular';

@Component({
  selector: 'slide-tabs',
  templateUrl: 'slide-tabs.html'
})
export class SlideTabsComponent {

  @Input() slides: Slides;
  @Input() index: number = 0;
  @Input() speed: number = 300;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  titles = [];

  constructor(private _renderer: Renderer2, private _el: ElementRef) {
  }

  ngOnInit() {
    this.setSlides();
    this.getTitles();

    this._renderer.addClass(this._el.nativeElement.parentElement.parentElement, 'slide-tabs');
  }

  ngOnChanges(changes: SimpleChanges) {
    const index = changes["index"];
    if (index) {
      try {
        this.slideTo(this.index, index.firstChange ? 0 : this.speed);
      }
      catch (ex) { }
    }
  }

  setSlides() {
    const slides = this.slides;

    slides.onlyExternal = true;
    slides.keyboardControl = false;

    if (slides.autoHeight) {
      this.speed = 0;
    }

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

  segmentChanged(segmentButton: SegmentButton) {
    this.slideTo(parseInt(segmentButton.value));
  }

  slideTo(index: number, speed: number = this.speed) {
    setTimeout(() => {
      this.slides.slideTo(index, speed);
    });
    this.change.emit(this.index);
  }

}
