import { Directive, Host } from '@angular/core';
import { Slides } from 'ionic-angular';

@Directive({
  selector: '[auto-height]'
})
export class AutoHeightDirective {

  constructor(@Host() public slides: Slides) {
  }

  ngAfterViewInit() {
    this.slides.autoHeight = true;
  }

}
