import { Directive, Attribute, Input, HostBinding, HostListener, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'img[my-src]'
})
export class MySrcDirective {
  private error = false;

  private default = new URL("../assets/imgs/df.jpg", location.origin);

  @Input('my-src') mySrc;

  @HostBinding('src') src: URL = this.default;

  @HostListener('error') onError() {
    if (!this.error) {
      this.error = true;
      this.src = this.errSrc || this.default;
    }
  }

  constructor(@Attribute("err-src") public errSrc) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const mySrc = changes["mySrc"];

    if (mySrc.currentValue) {
      if (!(mySrc.currentValue === mySrc.previousValue)) {
        this.src = new URL(mySrc.currentValue, location.origin);
      }
    }
    else {
      this.onError();
    }
  }

}
