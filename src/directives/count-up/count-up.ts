import { Directive, ElementRef, Input } from '@angular/core';
import { Content } from 'ionic-angular';
import * as CountUp from 'countup.js';

@Directive({
  selector: '[countUp]' // Attribute selector
})
export class CountUpDirective {

  countUp: any;
  /**
   * Optional extra configuration, such as easing.
   */
  @Input('countUp')
  options: any;

  /**
   * Optional start value for the count. Defaults to zero.
   */
  @Input()
  startVal: number;

  /**
   * The value to count up to.
   */
  private _endVal: number;

  get endVal(): number {
    return this._endVal;
  }
  @Input()
  set endVal(value: number) {

    this._endVal = value;

    if (isNaN(value)) {
      return;
    }

    if (!this.countUp) {
      return;
    }

    this.update();
  }

  /**
   * Optional duration of the animation. Default is two seconds.
   */
  @Input()
  duration: number;

  /**
   * Optional number of decimal places. Default is two.
   */
  @Input()
  decimals: number;

  private init: boolean = false;

  ngAfterViewInit() {
    this.countUp = this.createCountUp(this.startVal, this.endVal, this.decimals, this.duration);
    this.animate();
  }

  constructor(private el: ElementRef, private content: Content) {
    content.ionScroll.subscribe(this.update.bind(this));
  }

  update() {
    const d = this.content.getContentDimensions();
    const elRect = this.el.nativeElement.getBoundingClientRect();

    if (!this.init && (elRect.top + elRect.height / 2) <= d.contentHeight) {
      this.init = true;
      this.countUp.update(this.endVal);
    }
  }

  private createCountUp(sta, end, dec, dur) {
    sta = sta || 0;
    // strip non-numerical characters
    if (isNaN(sta)) {
      sta = Number(sta.match(/[\d\-\.]+/g).join(''));
    }
    end = end || 0;
    if (isNaN(end)) {
      end = Number(end.match(/[\d\-\.]+/g).join(''));
    }
    dur = Number(dur) || 2;
    dec = Number(dec) || 0;

    // construct countUp
    let countUp = new CountUp(this.el.nativeElement, sta, end, dec, dur, this.options);
    const diff = Math.abs(end - sta);
    // make easing smoother for large numbers
    if (diff > 999) {
      const up = (end > sta) ? -1 : 1;
      countUp = new CountUp(this.el.nativeElement, sta, end + (up * 100), dec, dur / 2, this.options);
    }

    return countUp;
  }

  private animate() {
    this.countUp.reset();
    if (this.endVal > 999) {
      this.countUp.start(() => this.countUp.update(this.endVal));
    } else {
      this.countUp.start();
    }
  }

}
